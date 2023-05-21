const Order = require('../models/OrderModel.js');
const Cart = require('../models/CartModel.js');
const MenuItem = require('../models/MenuModel.js');
const mongoose = require('mongoose');
const User = require('../models/UserModel.js');

const updateCart = async (req, res) => {
    const { id, itemId, portions } = req.body;
  
    if (!id || !itemId || !portions) {
      return res.status(400).json({ error: "Missing all required fields." });
    }
  
    const userId = String(req.body.id);
  
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ error: "User ID invalid." });
    }
  
    try {
        const existingUser = await User.findOne({ _id: userId })
        if (!existingUser) {
            return res.status(400).json({ error: "User does not exist."})
        }
        let cart = await Cart.findOne({ userId });
        
        console.log(cart)
        if (!cart) {
            cart = new Cart({ userId, cartDetails: [] });
        }
    
        const menuItem = await MenuItem.findOne({ itemId });
    
        if (!menuItem) {
            return res.status(400).json({ error: "Menu Item does not exist." });
        }
    
        let amount = 0;
    
        for (const p of portions) {
            let price;
            for (const p2 of menuItem.portions) {
                if (p.size.toLowerCase() === p2.size.toLowerCase()) {
                    price = p2.price;
                }
            }
            if (!price) {
                return res.status(400).json({ error: `${p.size} size doesn't exist for this item.` });
            }
            amount += p.quantity * price;
        }
  
        const existingOrder = cart.cartDetails.find((order) => order.itemId === itemId);
        console.log(existingOrder)
        if (existingOrder) {
            // Update existing order
            existingOrder.portions = portions;
            existingOrder.amount = amount;
        } else {
            // Create a new order
            const orderDetails = {
                _id: menuItem._id,
                itemId: itemId,
                portions: portions,
                amount: amount
            };
            cart.cartDetails.push(orderDetails);
        }
        console.log(cart)
        await cart.save();
  
        return res.status(200).json({ message: "Item added to cart successfully.", cart });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Failed to add item to cart." });
    }
};
  

const clearCart = async (req, res) => {
    const userId = req.body.id;
    if (!userId) {
        return res.status(400).json({ error: "Missing User Id"})
    }
    if (!mongoose.Types.ObjectId.isValid(userId)) {
        return res.status(400).json({ error: "User ID invalid."})   
    }
    try {
        let cart = await Cart.findOne({ userId });
        if (!cart) {
            cart = new Cart({ userId });
        }
    
        cart.cartDetails = []; // Clear the cart details array
        await cart.save();

        return res.status(200).json({ message: "Cart has successfully cleared."});
    } catch (error) {
        console.error(error);
        return res.status(400).json({ error: "Failed to clear cart." });
    }
}

const getCart = async (req, res) => {
    const userId = req.params.id
    if (!userId) {
        return res.status(400).json({ error: "Missing User Id"})
    }
    try {
        const data = await Cart.findOne({userId})
        return res.status(200).json({ message: "Sucessfully retrieved cart.", data})
    } catch (error) {
        console.log(error)
        return res.status(400).json({ error: "Failed to retrieve cart." })
    }
}

module.exports = { updateCart, getCart, clearCart }
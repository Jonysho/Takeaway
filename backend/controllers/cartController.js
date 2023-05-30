const Cart = require('../models/CartModel.js');
const MenuItem = require('../models/MenuModel.js');
const mongoose = require('mongoose');
const User = require('../models/UserModel.js');

const addToCart = async (req, res) => {
    let { id, itemId, size } = req.body;
  
    if (!id || !itemId || !size) {
      return res.status(400).json({ error: "Missing all required fields." });
    }
    
    size = size.charAt(0).toUpperCase() + size.slice(1)
  
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
        
        if (!cart) {
            cart = new Cart({ userId, cartDetails: [] });
        }
    
        const menuItem = await MenuItem.findOne({ itemId });

        const portion = menuItem.portions.find(obj => obj.size === size)
        const price = portion.price
    
        if (!menuItem) {
            return res.status(400).json({ error: "Menu Item does not exist." });
        }

        const existingOrder = cart.cartDetails.find((order) => order.itemId === itemId);
        if (existingOrder) {
            // Update existing order
            const toUpdate = existingOrder.portions.find(obj => obj.size === size)
            if (toUpdate){
                console.log(menuItem.portions)
                toUpdate.quantity += 1
            } else {
                existingOrder.portions.push({
                    size: size,
                    quantity: 1,
                    price: price
                })
            }
            existingOrder.amount += price;
        } else {
            // Create a new order
            const orderDetails = {
                _id: menuItem._id,
                itemId: itemId,
                name: menuItem.name,
                image: menuItem.image,
                portions: [{
                    size: size,
                    quantity: 1,
                    price: price,
                }],
                amount: price,
            };
            cart.cartDetails.push(orderDetails);
        }
        cart.createdAt = new Date();
        await cart.save();
  
        return res.status(200).json({ message: "Item added to cart successfully.", cart: cart.cartDetails });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Failed to add item to cart." });
    }
};

const removeFromCart = async (req, res) => {
    let { id, itemId, size } = req.body;
  
    if (!id || !itemId || !size) {
      return res.status(400).json({ error: "Missing all required fields." });
    }
    
    size = size.charAt(0).toUpperCase() + size.slice(1)
  
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
        
        if (!cart) {
            cart = new Cart({ userId, cartDetails: [] });
        }
        
        const menuItem = await MenuItem.findOne({ itemId });
        
        const portion = menuItem.portions.find(obj => obj.size === size)
        const price = portion.price
        
        if (!menuItem) {
            return res.status(400).json({ error: "Menu Item does not exist." });
        }
        
        const index = cart.cartDetails.findIndex((order) => order.itemId === itemId);
        const existingOrder = cart.cartDetails[index]
        if (existingOrder) {
            // Update existing order
            let isUpdated = false
            existingOrder.portions.map((obj, index) => {
                // If there is a portion with a quanttiy about to be 0, 
                // we remove it from portions array,
                // then check if the item itself also needs removing from cart array
                if (obj.size === size){
                    if (obj.quantity === 1){
                        existingOrder.portions.splice(index, 1)
                        if (existingOrder.portions.length <= 0) {
                            cart.cartDetails.splice(index, 1)
                        }
                    } else {
                        obj.quantity --
                    }
                    isUpdated = true
                }
            })
            if (!isUpdated) {
                return res.status(400).json({error: "Item is not in cart to be removed."})
            }
            existingOrder.amount -= price;
        } else {
            return res.status(400).json({error: "Item is not in cart to be removed."})
        }
        await cart.save();
  
        return res.status(200).json({ message: "Item removed cart successfully.", cart: cart.cartDetails });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Failed to remove item from cart." });
    }
};

const clearCart = async (req, res) => {
    const userId = req.body.id;
    console.log(userId)
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
        let cart = await Cart.findOne({userId})
        if (cart === null){
            cart = {
                cartDetails: []
            }
        }
        return res.status(200).json({ message: "Sucessfully retrieved cart.", cart: cart.cartDetails})
    } catch (error) {
        console.log(error)
        return res.status(400).json({ error: "Failed to retrieve cart." })
    }
}

const favouriteCart = async (req, res) => {
    const { userId, favName } = req.body
    try {
        const user = await User.findOne({ _id: userId })
        if (!user) {
            return res.status(400).json({ error: "User does not exist."})
        }

        let cart = await Cart.findOne({ userId });
        if (!cart) {
            return res.status(400).json({ error: 'Cart cannot be found.'})
        }
        if (cart.cartDetails.length === 0) {
            return res.status(400).json({error: 'Cart cannot be empty.'})
        }
        const newFavourite = {
            name: favName,
            cart: cart.cartDetails
        }
        if (!user.favourites) {
            user.favourites = []
        }
        user.favourites.push(newFavourite);
        await user.save()
        return res.status(200).json({ message: 'Cart successfully saved in favourites.', favourites: user.favourites})
    } catch (error) {
        console.log(error)
        return res.status(400).json({error: 'Failed to save cart in favourites.'})
    }
}

const loadFavourite = async (req, res) => {
    const { userId, favCartId } = req.body
    try {
        const user = await User.findOne({ _id: userId })
        if (!user) {
            return res.status(400).json({ error: "User does not exist."})
        }
        let favCart;
        user.favourites.map(cart => {
            if (cart._id.toString() === favCartId){
                favCart = cart
            }
        })
        if (!favCart) {
            return res.status(400).json({error: "Favourite cart does not exist."})
        }
        let cart = await Cart.findOne({ userId });
        
        if (!cart) {
            cart = new Cart({ userId, cartDetails: [] });
        }
        cart.cartDetails = favCart.cart
        cart.createdAt = new Date();
        await cart.save();
        return res.status(200).json({ message: "Favourite loaded successful into cart.", cart: cart.cartDetails})
    } catch (error) {
        console.log(error)
        return res.status(400).json({error: 'Failed to load favourites into cart.'})
    }
}

module.exports = { addToCart, getCart, clearCart, removeFromCart, favouriteCart, loadFavourite }
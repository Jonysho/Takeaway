const User = require("../models/UserModel");
const Cart = require("../models/CartModel");

const stripe = require("stripe")(process.env.STRIPE_SECRET)

const checkout = async (req, res) => {
    const { userId } = req.body
    if (!userId){
        return res.status(400).json({error: error.message})
    }
    const user = await User.findOne({ _id: userId })
    if (!user) {
        return res.status(400).json({ error: "User does not exist."})
    }
    let cart = await Cart.findOne({ userId });

    if (!cart || !cart.cartDetails || cart.cartDetails.length == 0) {
        return res.status(400).json({ error: "Cart cannot be empty."})
    }

    const line_items = []
    
    cart.cartDetails.map(item => {
        item.portions.map(portion => {
            line_items.push({
                price_data: {
                    currency: 'gbp',
                    product_data: {
                        name: `${item.name} (${portion.size})`,
                        metadata: {
                            id: item.itemId
                        }
                    },
                    unit_amount: portion.price * 100,
                },
                quantity: portion.quantity,
            })
        })
    })
    console.log(line_items)
    const session = await stripe.checkout.sessions.create({
        line_items,
        mode: "payment",
        success_url: `${process.env.BASE_URL}checkout/confirmation`,
        cancel_url: `${process.env.BASE_URL}checkout/details`,
        customer_email: user.email,


    })
    console.log("ell")
    res.send({ url: session.url });
}

module.exports = { checkout }
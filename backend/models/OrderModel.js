// const mongoose = require("mongoose");

// const portionSchema = new mongoose.Schema({
//     size: {
//         type: String,
//         required: true,
//     },
//     quantity: {
//         type: Number,
//         required: true,
//         default: 0,
//     }
// })

// const orderSchema = new mongoose.Schema({
//     itemId: {
//         type: Number,
//         ref: 'menuitems',
//         required: true
//     },
//     portions: {
//         type: [portionSchema],
//         required: true,
//     },
//     amount: {
//         type: Number
//     },
// }, {versionKey: false})

// module.exports = mongoose.model('Order', orderSchema);
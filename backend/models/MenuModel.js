const mongoose = require('mongoose')

const itemSizeSchema = new mongoose.Schema({
    // small, regular, large, for duck: 1/4, 1/2
    size: {
      type: String,
      required: true,
      unique: true,
    },
    price: {
      type: Number,
      required: true
    }
});
  
const menuItemSchema = new mongoose.Schema({
    itemId: {
        type: Number,
        required: true,
        unique: true
    },
    name: {
        type: String,
        required: true,
        trim: true
    },
    type: {
        type: String,
        required: true,
    },
    moreInfo: {
        type: String,
    },
    hot: {
        type: Boolean,
        default: false
    },
    recommended: {
        type: Boolean,
        default: false
    },
    quantity: {
        type: Number,
        default: 1
    },
    size: {
      type: [itemSizeSchema],
      default: [],
      required: true
    },
});

module.exports = mongoose.model('MenuItem', menuItemSchema);
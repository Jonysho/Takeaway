const mongoose = require('mongoose')

const itemSizeSchema = new mongoose.Schema({
    _id: mongoose.Types.ObjectId,
    // small, regular, large, for duck: 1/4, 1/2
    size: {
      type: String,
      required: true,
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
    category: {
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
    },
    image: {
        type: String,
        required: true,
    },
    portions: {
      type: [itemSizeSchema],
      default: [],
      required: true
    },
});

menuItemSchema.index({ 'size.size': 1 }, { unique: false });
module.exports = mongoose.model('MenuItem', menuItemSchema);
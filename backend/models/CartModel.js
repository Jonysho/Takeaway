const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  cartDetails: [
    {
      itemId: {
        type: Number,
        ref: 'menuitems',
        required: true
      },
      name: {
        type: String,
        ref: 'menuitems',
      },
      image: {
        type: String,
        ref: 'menuitems',
      },
      portions: [
        {
          size: {
            type: String,
            required: true
          },
          quantity: {
            type: Number,
            required: true,
            default: 0
          },
          price: {
            type: Number,
          }
        }
      ],
      amount: {
        type: Number,
        required: true
      }
    }
  ],
  createdAt: {
    type: Date,
    default: Date.now,
    expires: 3600,
    index: true,
  }
});

cartSchema.index({ createdAt: 1 }, { expireAfterSeconds: 3600 })

module.exports = mongoose.model('Cart', cartSchema);

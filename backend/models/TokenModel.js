const mongoose = require('mongoose');

const tokenSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    unique: true
  },
  token: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now,
    expires: 120,
    index: true,
  }
});

tokenSchema.index({ createdAt: 1 }, { expireAfterSeconds: 120 })

module.exports = mongoose.model('Token', tokenSchema);
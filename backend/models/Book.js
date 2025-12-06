const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
  serialNo: {
    type: String,
    required: true,
    unique: true
  },
  title: {
    type: String,
    required: true
  },
  author: {
    type: String,
    required: true
  },
  type: {
    type: String,
    enum: ['book', 'movie'],
    default: 'book'
  },
  category: {
    type: String,
    required: true
  },
  isbn: {
    type: String
  },
  publisher: {
    type: String
  },
  publishedYear: {
    type: Number
  },
  totalCopies: {
    type: Number,
    required: true,
    default: 1
  },
  availableCopies: {
    type: Number,
    required: true,
    default: 1
  },
  isAvailable: {
    type: Boolean,
    default: true
  },
  shelfLocation: {
    type: String
  },
  status: {
    type: String,
    enum: ['Available', 'Issued', 'Damaged'],
    default: 'Available'
  },
  cost: {
    type: Number,
    default: 0
  },
  procurementDate: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Book', bookSchema);

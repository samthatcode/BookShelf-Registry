const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
  name: String,
  email: { type: String, require: true },
  homebook: String,
  books: [{
    id: {
      type: String,
      require: true
    },
    review: String,
    pagenow: Number,
    rating: Number,
    notes: [{
      time: String,
      content: String,
    }]
  }]
});


// Export the User model using module.exports
module.exports = mongoose.model('User', userSchema);
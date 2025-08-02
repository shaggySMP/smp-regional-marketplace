const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true
  },
  password: {
    type: String,
    required: true,
    minlength: 6
  },
  country: {
    type: String,
    required: true,
    enum: ['Latvia', 'Estonia', 'Lithuania']
  },
  profilePhoto: {
    type: String,
    default: ''
  },
  isBanned: {
    type: Boolean,
    default: false
  },
  isSuspended: {
    type: Boolean,
    default: false
  },
  role: {
    type: String,
    enum: ['user', 'admin', 'staff'],
    default: 'user'
  }
}, {
  timestamps: true
});

// Remove password from JSON output
userSchema.methods.toJSON = function() {
  const user = this;
  const userObject = user.toObject();
  
  delete userObject.password;
  
  return userObject;
};

module.exports = mongoose.model('User', userSchema);

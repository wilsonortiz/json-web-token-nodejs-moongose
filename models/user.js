'use strict'

const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
    lowertocase: true,
    required: true
  },
  displayName: {
    type: String,
    required: true
  },
  avatar_url: {
    type: String,
    default: null
  },
  password: {
    type: String,
    required: true
  },
  signupDate: {
    type: Date,
    default: Date.now()
  },
  lastLogin: {
    type: Date,
    default: null
  }
});

UserSchema.pre('save', function(next) {
  var user = this;
  // only hash the password if it has been modified (or is new)
  if (!user.isModified('password')) 
    return next();
  
  // generate a salt
  bcrypt.genSalt(10, function(err, salt) {
    if (err) 
      return next(err);
    
    // hash the password along with our new salt
    bcrypt.hash(user.password, salt, function(err, hash) {
      if (err) 
        return next(err);
      
      // override the cleartext password with the hashed one
      user.password = hash;
      next();
    });
  });

});

module.exports = mongoose.model('User', UserSchema);

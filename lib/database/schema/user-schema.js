'use strict';
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

///////////////////////////////////////////////////////////
// This is the model for data being stored in the database
/////////////////////////////////////////////////////////// 

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  phoneNumber: { type: Number, required: true, unique: true },
  color: { type: String, required: false, default: '#808080' },
  friends: { type: Array, default: [] },
  pendingRequest: { type: Array, default: [] },
  email: { type: String },
  role: { type: String, default: 'adult', enum: ['adult', 'child'] },
});

///////////////////////////////////////////////////////////
//  Checks if a user is in the databse and if the password
// input matches the saved password in the database
///////////////////////////////////////////////////////////

userSchema.statics.authenticateBasic = async function (username, password) {
  try {
    let user = await this.findOne({ username });
    let compare = null;
    if (user) {
      compare = await bcrypt.compare(password, user.password);
    }
    if (user && compare) {
      return (user);
    } else {
      return Promise.reject();
    }
  } catch (e) {
    return Promise.reject();
  }
};

module.exports = mongoose.model('users', userSchema);

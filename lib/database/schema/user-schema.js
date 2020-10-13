const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

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


userSchema.statics.authenticateBasic = async function (username, password) {
  try {
    console.log('in the authenticate basic, username: ', username);
    let user = await this.findOne({ username });
    console.log('user in authenticate basic', user);
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



const express = require('express');
const bcrypt = require('bcrypt');

const router = express.Router();
const UserSchema = require('../../lib/database/schema/user-schema');
const auth = require('../middleware/auth');


router.post('/signup', newUser);
router.post('/signin', auth, getUser);

async function newUser (request, response) {
  try {
    let userCheck = await checkForUser(request.body.username);
    if (userCheck) {
      // if username exists in database, alert user already exists
      console.log('user already exists: ', request.body.username);
      response.body.message = 'used name';
      response.status(200).send('used name');
    }
    if (request.body.password) {
      let hashedPassword = await bcrypt.hash(request.body.password, 5);
      request.body.password = hashedPassword;
    }
    await UserSchema.create(request.body);
    response.status(200).send('success');
  } catch (error) {
    console.error('Error trying to save:', error);
  }
}

async function checkForUser(username) {
  let foundUser = await UserSchema.findOne({ username });
  if (foundUser) {
    return true;
  }
  return false;
}

async function getUser(request, response) {
  response.status(200).send({user: request.user});
}



module.exports = router;




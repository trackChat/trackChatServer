

const express = require('express');
const bcrypt = require('bcrypt');

const router = express.Router();
const UserSchema = require('../../lib/database/schema/user-schema');
const auth = require('../middleware/auth');


router.post('/signup', newUser);
router.post('/signin', auth, getUser);
router.get('/getusers', getAllUsers);


async function getAllUsers (request, response) {
  try {
    let users = await UserSchema.find({});
    let usernames = users.map(user => {
      return user.username;
    });
    console.log(usernames);
    response.status(200).send(usernames);
  } catch (error) {
    console.error('Error trying to get users:', error);
  }
}

async function newUser (request, response) {
  try {
    let userCheck = await checkForUser(request.body.username);
    if (userCheck) {
      console.log('user already exists: ', request.body.username);
      response.status(200).send('used name');
    }
    
    let emailCheck = null;
    if(request.body.email) {
      emailCheck = await checkForEmail(request.body.email);  
    }
    
    if (emailCheck) {
      console.log('email already exists: ', request.body.email);
      response.status(200).send('used email');
    }

    let phoneCheck = await checkForPhone(request.body.phoneNumber);
    if (phoneCheck) {
      console.log('phone number already exists: ', request.body.phoneNumber);
      response.status(200).send('used phone number');
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

async function checkForEmail(email) {
  let foundEmail = await UserSchema.findOne({ email });
  if (foundEmail) {
    return true;
  }
  return false;
}

async function checkForPhone(phoneNumber) {
  let foundPhone = await UserSchema.findOne({ phoneNumber });
  if (foundPhone) {
    return true;
  }
  return false;
}


async function getUser(request, response) {
  response.status(200).send({user: request.user});
}




module.exports = router;




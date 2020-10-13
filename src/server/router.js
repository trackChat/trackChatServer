

const express = require('express');
const bcrypt = require('bcrypt');

const router = express.Router();
const UserSchema = require('../../lib/database/schema/user-schema');
const auth = require('../middleware/auth');


router.post('/signup', newUser);
router.post('/signin', auth, getUser);

async function newUser (request, response) {
  try {
    if (request.body.password) {
      request.body.password = await bcrypt.hash(request.body.password, 5);
    }
    await UserSchema.create(request.body);
    response.status(200).send('success');
  } catch (error) {
    console.error('error trying to save', error);
  }
}

async function getUser(request, response) {
  response.status(200).send({user: request.user});
}



module.exports = router;




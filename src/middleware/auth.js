
const base64 = require('base-64');
const User = require('../../lib/database/schema/user-schema');

module.exports = async (request, response, next) => {
  const errorObj = {status: 401, statusMessage: 'Unauthorized', message:'Sorry, Invalid username/password'};

  if(!request.headers.authorization) {next(errorObj); return;}
  let encodedPair = request.headers.authorization.split(' ').pop();
  

  let [user, pass] = base64.decode(encodedPair).split(':');
  try{
    const validUser = await User.authenticateBasic(user, pass);
    request.user = validUser;
    next();
  } catch(err) {
    next(errorObj);
  }
};

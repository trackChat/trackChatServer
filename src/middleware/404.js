'use strict';

///////////////////////////////////////////////////////////
// Handles errors if a route is not found
///////////////////////////////////////////////////////////

module.exports = (req,res) => {
  res.status(404);
  res.statusMessage = 'Resource Not Found';
  res.json({error:'Not Found'});
};
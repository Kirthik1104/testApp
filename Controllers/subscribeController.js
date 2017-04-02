var subscribeController = function( Subscribe ) {

  'use strict';

  var post = function( req, res ) {
    console.log(req.body.email);
    var subscribe = new Subscribe( req.body );
    if ( !req.body.email ) {
    
      res.status( 400 );
      res.send( 'Email is required' );
    
    } else {
    
      subscribe.save();
      res.status( 200 );
      res.send( subscribe );
    
    }

  };

  var get = function(req, res) {
    
  };

  return {
    post : post
  };
}

module.exports = subscribeController;
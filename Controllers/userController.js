var userController = function( User ) {

  'use strict';

  var post = function( req, res ) {
    var user = new User( req.body );
      user.save();
      res.status( 200 );
      res.send( user );

  };

  var get = function( req, res ) {
    var query = {};
    if ( req.query.userName ) {
      query.userName = req.query.userName;
      console.log(JSON.stringify(query))
    }

    User.find( query, function( err, user ) {
      if ( err ) {
        res.status( 500 ).send( err );

      } else {
        var returnUser = [];
        user
          .forEach( function( element, index, array ) {          
            var newUser = element.toJSON();
            returnUser.push( newUser );
          });
        res.json( user );
      }
    
    });
  
  };

  return {
    post : post,
    get  : get
  };

};

module.exports = userController;

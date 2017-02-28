var jwt = require('jsonwebtoken');

var userController = function( User ) {

  'use strict';

  var post = function( req, res ) {
    var user = new User( req.body );
      user.save();
      res.status( 200 );
      res.send( user );

  };

  var get = function(req, res) {
    if (req.query.token) {
        var authorization = req.query.token,
            decoded;    
        try {
            decoded = jwt.verify(authorization, "MYSECRETKEY007");
      console.log(decoded);
        } catch (e) {
            return res.status(401).send('unauthorized');
        }
        var userId = decoded.id;
        // Fetch the user by id 
        /*User.findOne({_id: userId}).then(function(user){
            // Do something with the user
      
      return res.status(200).send({
        userName: user.userName 
      });
        });*/
    console.log(decoded.userid)
    var obj = {};
    if (decoded.admin == "false" ) {
        obj = {_id: decoded.userid};
    }


    User.find(obj, function(err, users) {
      res.json(users);
    });
   }
  };
 /*
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
  
  };*/

  return {
    post : post,
    get  : get
  };

};

module.exports = userController;

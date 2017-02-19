var express = require( 'express' );

var routes = function( User ) {

  var userRouter = express.Router();
  var userController = require( '../Controllers/userController' )( User );


  userRouter.use('/:userId', function(req, res, next){
        User.findById(req.params.userId, function(err, user){
            if(err){
                res.status(500).send('no user found');
            } else if (user) {
                req.user = user;
                next();
            } else {
                res.status(404).send('no user found');
            }
        });
    });

  userRouter.route( '/' )
    .post( userController.post)
    .get( userController.get );
     userRouter.route('/:userId').put( function( req, res ) {
      if ( req.body._id ) {
        delete req.user._id;
      }

      for ( var p in req.body ) {
        req.user[ p ] = req.body[ p ];
      }
      
      req.user.save( function( err ) {
        if ( err ) {
          res.status( 500 ).send( err );
        }
        
        else {
          res.status( 200 ).send( req.user );
        }
      
      }); 
    })
    .delete( function( req, res ) {
      console.log(JSON.stringify(req));
        req.user.remove( function( err ) {
        if ( err ) {
          res.status( 500 ).send( err );
        } else {
          res.status( 204 ).send( {status :'Removed'} );
        }
      });
    });

  return userRouter;

};

module.exports = routes;

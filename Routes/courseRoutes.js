var express = require( 'express' );
var jwt    = require('jsonwebtoken');

var routes = function( Course ) {

  var courseRouter = express.Router();
  var courseController = require( '../Controllers/courseController' )( Course );


  courseRouter.use(function(req, res, next) {

  // check header or url parameters or post parameters for token
  var token = req.body.token || req.query.token || req.headers['x-access-token'];

  // decode token
  if (token) {

    // verifies secret and checks exp
    jwt.verify(token, "MYSECRETKEY007", function(err, decoded) {      
      if (err) {
        return res.json({ success: false, message: 'Failed to authenticate token.' });    
      } else {
        // if everything is good, save to request for use in other routes
        req.decoded = decoded;    
        next();
      }
    });

  } else {

    // if there is no token
    // return an error
    return res.status(403).send({ 
        success: false, 
        message: 'No token provided.' 
    });
    
  }
});




  courseRouter.use( '/:courseId', function( req, res, next ) {
  
    Course.findById( req.params.courseId, function( err, course ) {
    
      if ( err ) {
        res.status( 500 ).send( 'no course found' );
      
      } else if ( course ) {
        req.course = course;
        next();
      
      } else {
        
        re.status( 404 ).send( 'no course found' );
      
      }
    
    });
  
  });

  courseRouter.route( '/' )
    .post( courseController.post )
    .get( courseController.get );

     courseRouter.route( '/:courseId' )
    .get( function( req, res ) {

      var returnCourse = req.course.toJSON();
      var newLink = 'http://' + req.headers.host + '/api/courses/?genre=' + returnCourse.genre;

      returnCourse.links = {};
      returnCourse.links.filterByThisGenre = nextewLink.replace( ' ', '%20' );


      res.json( returnCourse ); 

    })
    .put( function( req, res ) {
    
     
      req.course.title = req.body.title;
      req.course.author = req.body.author;
      req.course.genre = req.body.genre;
      req.course.read = req.body.read;

      req.course.save( function( err ) {
      
        if ( err ) {
        
          res.status( 500 ).send( err );
        
        } else {
        
          res.json( req.course );

        }
      
      });
        
    })
    .patch( function( req, res ) {
    
      if ( req.body._id ) {
      
        delete req.course._id;

      }

      for ( var p in req.body ) {
      
        req.course[ p ] = req.body[ p ];
      
      }
      
      req.course.save( function( err ) {
      
        if ( err ) {
        
          res.status( 500 ).send( err );
        
        } else {
        
          res.status( 200 ).send( req.course );
        
        }
      
      }); 
    })
    .delete( function( req, res ) {
      console.log(JSON.stringify(req));
      req.course.remove( function( err ) {
      
        if ( err ) {

          res.status( 500 ).send( err );
        
        } else {
        
          res.status( 204 ).send( 'Removed' );

        }
      
      });
    
    });

  return courseRouter;

};

module.exports = routes;

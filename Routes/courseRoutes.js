var express = require( 'express' );

var routes = function( Course ) {

  var courseRouter = express.Router();
  var courseController = require( '../Controllers/courseController' )( Course );

  courseRouter.use( '/:courseId', function( req, res, next ) {
  
    Course.findById( req.params.courseId, function( err, course ) {
    
      if ( err ) {
      
        res.status( 500 ).send( err );
      
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
      returnCourse.links.filterByThisGenre = newLink.replace( ' ', '%20' );


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

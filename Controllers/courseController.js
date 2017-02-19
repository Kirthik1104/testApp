var courseController = function( Course ) {

  'use strict';

  var post = function( req, res ) {
  
    var course = new Course( req.body );

    if ( !req.body.title ) {
    
      res.status( 400 );
      res.send( 'Title is required' );
    
    } else {
    
      course.save();
      res.status( 201 );
      res.send( course );
    
    }

  };

  var get = function( req, res ) {
  
    var query = {};

    if ( req.query.genre ) {
    
      query.genre = req.query.genre;

    }

    Course.find( query, function( err, course ) {
    
      if ( err ) {

        res.status( 500 ).send( err );

      } else {

        var returnCourse = [];

        course
          .forEach( function( element, index, array ) {
          
            var newCourse = element.toJSON();

            newCourse.links = {};
            newCourse.links.self = 'http://' + req.headers.host + '/api/courses/' + newCourse._id;

            returnCourse.push( newCourse );
          
          });

        res.json( returnCourse );

      }
    
    });
  
  };

  return {
    post : post,
    get  : get
  };

};

module.exports = courseController;

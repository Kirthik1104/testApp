var express = require( 'express' );
var jwt = require('jsonwebtoken');

var routes = function( Course ) {

var courseRouter = express.Router();
var courseController = require( '../Controllers/courseController' )( Course );

/*courseRouter.route( '/:courseId' )
    .get( function( req, res ) {
      var returnCourse = req.course.toJSON();
      var newLink = 'http://' + req.headers.host + '/api/courses/?genre=' + returnCourse.genre;

      returnCourse.links = {};
      returnCourse.links.filterByThisGenre = newLink.replace( ' ', '%20' );
      res.json( returnCourse ); 

});
*/
courseRouter.route('/').get(courseController.getAll)

}
module.exports = routes;

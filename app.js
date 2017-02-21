var express = require( 'express' );
var mongoose = require( 'mongoose' );
var bodyParser = require( 'body-parser' );
var config = require('./config');


var db;


if ( process.env.ENV === 'Test' ) {
   mongoose.Promise = global.Promise;
  var db = mongoose.connect( config.database );
} else {
  var db = mongoose.connect( config.database );

}

var User = require( './models/userModels' );
var Course = require( './models/courseModels' );

app  = express();
var port = config.PORT;

app.use( bodyParser.urlencoded({ extended : true }));
app.use( bodyParser.json());

authenticatRouter = require( './Routes/authentication' )( User )
userRouter = require( './Routes/userRoutes' )( User );
courseRouter = require( './Routes/courseRoutes' )( Course );

app.use( '/api/authenticat', authenticatRouter);
app.use( '/api/user', userRouter);
app.use( '/api/courses', courseRouter );

app.get( '/', function( req, res ) {
  res.send( 'welcome to my API' );
});

app.listen( port, function() {
  console.log( 'Running at port:', port );
});

module.exports = app;

express = require( 'express' );
var mongoose = require( 'mongoose' );
var bodyParser = require( 'body-parser' );
var config = require('./config');
var server_ip_address = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1'

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

server = require('http').createServer(app)
io = require('socket.io').listen(server)

app.use(express.static('public'))
var port = config.PORT;

var config = require('./chatapp');

app.use( bodyParser.urlencoded({ extended : true }));
app.use( bodyParser.json());


authenticatRouter = require( './Routes/authentication' )( User )
userRouter = require( './Routes/userRoutes' )( User );
courseRouter = require( './Routes/courseRoutes' )( Course );
//allcourseRouter = require( './Routes/allcourseRoutes' )( Course );

app.use( '/api/authenticat', authenticatRouter);
app.use( '/api/user', userRouter);
app.use( '/api/course', courseRouter );
//app.use( '/api/getallcourses', allcourseRouter );



app.post("/contact", function(req, res){

var api_key = 'key-93f1d3a63817c1379200fe33c95165d6';
var domain = 'sandbox0f7199227c3c441b8064292ffa8cd1ab.mailgun.org';
var mailgun = require('mailgun-js')({apiKey: api_key, domain: domain});

var data = {
  from: 'akshay<postmaster@sandbox0f7199227c3c441b8064292ffa8cd1ab.mailgun.org>',
  to: 'akshaymhatre89@yahoo.in',
  subject: 'req.body.email',
  text: 'req.body.message'
};

mailgun.messages().send(data, function (error, body) {
  console.log(body);
  if(!error)
  res.send({"success":true});
else
res.send({"success":false});
});

})
/*
app.get( '/', function( req, res ) {
  res.send( 'welcome to my API' );
});
*/
/*app.listen( port, function() {
  console.log( 'Running at port:', port );
});
*/
server.listen(3001,server_ip_address,function () {
  console.log("Listening on " + server_ip_address + ", port " + 3001)
})


module.exports = app;




var jwt = require('jsonwebtoken');
var courseController = function( Course ) {

  'use strict';

  var post = function( req, res ) {
  console.log(req.body.creatorid);
    var course = new Course( req.body );
    console.log(req.body.creatorid)
    if ( !req.body.title ) {
    
      res.status( 400 );
      res.send( 'Title is required' );
    
    } else {
    
      course.save();
      res.status( 200 );
      res.send( course );
    
    }

  };


  var get = function(req, res) {
    console.log("hemant")
    var token = req.body.token || req.query.token || req.headers['x-access-token'];
    if (token) {        
        var decoded;    
        try {
            decoded = jwt.verify(token, "MYSECRETKEY007");
            console.log(decoded);
        } catch (e) {
            return res.status(401).send('unauthorized');
        }
        var userId = decoded.id;
        var obj;
    if (decoded.admin != "admin" ) {
        obj = {creatorid: decoded.userid};
    }

    Course.find(obj, function(err, course) {    
      return res.status(200).send({ 
        success: true,
        course:course,
        userName: decoded.userName
      });
    });
   }
   else
   {
      return res.status(401).send('unauthorized');
   }
  };


  var getAll = function(req, res) {
    console.log(JSON.stringify(req.body))
    Course.find({ 
        $text: {$search: req.body.keyword } 
       }, function(err, course) {
      //console.log("course"+course);
      //res.json(course);

      return res.status(200).send({ 
        success: true,
        course:course
      });
    });
  };

  return {
    post : post,
    get  : get,
    getAll : getAll
  };

};

module.exports = courseController;

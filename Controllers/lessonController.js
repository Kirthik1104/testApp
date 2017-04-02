var lessonController = function( Lesson ) {

  'use strict';

  var post = function( req, res ) {
    var lesson = new Lesson( req.body );
      lesson.save(function (err) {
          if(err) {          
            res.status( 301 );
            res.send( {"success": "err"} );
          }
          else {
            res.status( 200 );
            res.send( res.message || {"success": true} );
          }
      });
  };


  var getbycourseID = function(req, res) {
    res.status( 201 );
    res.send({"success": true} );
  };


  var get = function(req, res) {
    res.status( 201 );
    res.send({"success": true} );
  };

  return {
    post : post,
    get : get,
    getbycourseID  : getbycourseID
  };

};

module.exports = lessonController;

var mongoose = require( 'mongoose' );
var Schema = mongoose.Schema;

var courseModel = new Schema({
  creatorid : {type:String},
  title : { type : String},
  description: { type: String },
  duration: {type:String},
  instructor : { type : String },
  genre : { type : String },
  subscribe : { type : String}

});

var Course = mongoose.model( 'Course', courseModel );

module.exports = Course;

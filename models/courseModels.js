var mongoose = require( 'mongoose' );
var Schema = mongoose.Schema;

var courseModel = new Schema({
  title : { type : String },
  description: {type: String },
  instructor : { type : String },
  genre : { type : String },
  read : { type : Boolean, default : false }
});

var Course = mongoose.model( 'Course', courseModel );

module.exports = Course;

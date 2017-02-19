var mongoose = require( 'mongoose' );
var Schema = mongoose.Schema;

var courseModel = new Schema({
  title : { type : String },
  author : { type : String },
  genre : { type : String },
  read : { type : Boolean, default : false }
});

var Course = mongoose.model( 'Course', courseModel );

module.exports = Course;

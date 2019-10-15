
const mongoose = require('mongoose');



const carschema = new mongoose.Schema({

	id:Number,
	model:String,
	book_status:Boolean,
	capacity:Number,
	Price:Number,
	class:String,

});

 module.exports = mongoose.model('cars',carschema);


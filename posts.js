const express = require('express');
const router = express.Router();
const cars = require('../models/cars');
const transactions = require('../models/transactions');



router.put('/book', function(req,res){		// api 2 : Book status of car changed upon booking ; car identified by id
	
	var id= req.body.id;
	// var issue= req.body.issue;
	// var return1= req.body.return1;
	cars.find({"id":id},function(err,carsres){
	console.log(carsres);
	if(carsres[0].book_status == true) {
		console.log("Already Booked ! Select another car .. ");
		res.send("Already Booked ! Select another car .. ");
	}
	else{
		cars.updateOne({"id":id},{$set:{book_status:1}},function(){});
		// var trans = new transactions({
		// 	id: id,
		// 	issue: issue,
		// 	return1: return1
		// 			});
		//trans.save(function(err,result){

    //});
	}
	});
	});	

router.post('/available', function(req,res){		// api 3 : filter used : seat_capacity , price
	var cap = req.body.capacity;
	var price = req.body.Price;
	cars.find({"book_status":false, "capacity": { $gte: cap }, "Price": {$lte: price} },function(err,carsres){
		 if(err)throw err;
		res.send(carsres);
	})
	});

router.post('/unique', function(req,res){			//api 4 : display current car details; car identified by model
	var model = req.body.model;

	cars.find({"model":model},function(err,carsres){
		 if(err)throw err;
		res.send(carsres);
	})
	});



router.post('/',function(req,res) {		//api 1 : Adding a new car
 	var posters = new cars({
 		id: req.body.id,
		model: req.body.model,
		book_status:req.body.book_status,
		capacity:req.body.capacity,
		Price:req.body.Price,
		class:req.body.class
	});
 	try {
 		console.log(posters.id);
 		posters.save(function(err,result){
        console.log("Result is:");
        console.log(result);
        res.send(result);
    });
 	} catch(err) {
 		res.json({message:err});
 	}
 });


router.post('/delete', function(req,res) {		// api 5 : Deleting a car ; car identified by id

	var id= req.body.id;
	cars.find({"id":id},function(err,carsres){
	console.log(carsres);
	if(carsres[0].book_status == true) {
		console.log("Already Booked ! Select another car .. ");
		res.send("Already Booked ! Select another car .. ");
	}
	else{
		cars.deleteOne({"id":id},function(err,result){
			if(err) throw err;
			res.send(result);
		});
	
	}
});
});


router.put('/updation', function(req,res) {		// api 5 : Updating a car ; car identified by id

	var id= req.body.id;
	var model = req.body.model;
	var capacity = req.body.capacity;
	var price = req.body.Price;
	var type = req.body.class;

	cars.find({"id":id},function(err,carsres){
	console.log(carsres);
	if(carsres[0].book_status == true) {
		console.log("Already Booked ! Select another car .. ");
		res.send("Already Booked ! Select another car .. ");
	}
	else{
		cars.updateOne({"id":id} , {$set:{"model":model,"capacity":capacity,"Price":price,"class":type,book_status:0}},function(err,result){
			if(err) throw err;
			res.send(result);
		});
	
	}
});
});


module.exports = router; 
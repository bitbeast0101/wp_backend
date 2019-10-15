const express = require('express');
const mongodb = require('mongodb')
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();

require('dotenv/config');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const port = 3000;

const postsRoute = require('./routes/posts');

app.use('/posts',postsRoute);


//require('/app/routes')(app, {}); //impotring route into the server; {} -> empty object
app.get('/',(req,res) => {
	res.send("Home Page");
});

// connect to db
mongoose.connect("mongodb://127.0.0.1:27017/carsdb",
		{useNewUrlParser : true}
		);




app.listen(port);









// const MongoClient = require('mongodb').MongoClient;
// const uri = "mongodb+srv://rohithch:<password>@cluster0-mczbh.mongodb.net/test?retryWrites=true&w=majority";
// const client = new MongoClient(uri, { useNewUrlParser: true });
// client.connect(err => {
//   const collection = client.db("test").collection("devices");
//   // perform actions on the collection object
//   client.close();
// });

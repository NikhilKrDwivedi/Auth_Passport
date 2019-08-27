const mongoose = require('mongoose');
//connection from database 
//const dbURI ="mongodb://nikhil123:nikhil123@cluster0-shard-00-00-xwtl4.mongodb.net:27017,cluster0-shard-00-01-xwtl4.mongodb.net:27017,cluster0-shard-00-02-xwtl4.mongodb.net:27017/PassPort?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true&w=majority";
const dbURI ="mongodb://localhost:27017/PassPort";
const options = {
  reconnectTries: Number.MAX_VALUE,
  poolSize: 10,
  useNewUrlParser: true ,
};
const db=mongoose.connect(dbURI, options).then(
  () => {

    console.log("Database connection established!");
  },
  err => {
    console.log("Error connecting Database instance due to: ", err);
  }
);

module.exports = db;
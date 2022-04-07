const mongodb = require('mongodb');

//MongoClient class allow us to connect to mongdb database
const MongoClient = mongodb.MongoClient;   

//create database name
const dbName = 'demo';
//create a datbase url
 const dbUrl = `mongodb+srv://Vaibhavmde:e6426tTwPwmEkNvQ@cluster0.itgjs.mongodb.net/test?authSource=admin&replicaSet=atlas-14nye9-shard-0&readPreference=primary&appname=MongoDB%20Compass&ssl=true`;

 module.exports = {mongodb,MongoClient,dbUrl};
//MYSQL
/* const mysql = require('mysql2');

const pool  = mysql.createPool({
  host: 'localhost',
  user: 'root',
  database: 'node-complete',
  password: '1234'
});

module.exports = pool.promise(); */

//Sequelize
/* const Sequelize = require('sequelize');

const sequelize = new Sequelize('node-complete', 'root', '1234', {
  dialect: 'mysql', 
  host: 'localhost'
});

module.exports = sequelize; */

//MongoDB
const mongodb = require('mongodb')
const MongoClient = mongodb.MongoClient

let _db

const mongoConnect = (callback) => {
  MongoClient.connect(
    'mongodb+srv://saim:12345@node-complete.utokqsy.mongodb.net/shop?retryWrites=true&w=majority'
  )
    .then((client) => {
      console.log('Connected to MongoDB')
      _db = client.db()
      callback()
    })
    .catch((err) => {
      console.log(err)
      throw err
    })
}

const getDb = () => {
  if (_db) {
    return _db
  }
  throw 'No Database Found'
}

exports.mongoConnect = mongoConnect
exports.getDb = getDb

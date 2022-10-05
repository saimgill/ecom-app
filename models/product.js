// const Sequelize = require('sequelize')
// const sequelize = require('../util/database')

const mongodb = require('mongodb')
const getDb = require('../util/database').getDb

class Product {
  constructor(title, price, description, imageUrl, _id, userId) {
    this.title = title
    this.price = price
    this.description = description
    this.imageUrl = imageUrl
    this._id = _id ? new mongodb.ObjectId(_id) : null
    this.userId = userId
  }

  save() {
    const db = getDb()
    let dbOp
    if (this._id) {
      dbOp = db
        .collection('products')
        .updateOne({ _id: new mongodb.ObjectId(this._id) }, { $set: this })
    } else {
      dbOp = db.collection('products').insertOne(this)
    }
    return db
      .collection('products')
      .insertOne(this)
      .then((result) => {
        console.log(result)
      })
      .catch((err) => console.log(err))
  }

  static fetchAll() {
    const db = getDb()
    return db
      .collection('products')
      .find()
      .toArray()
      .then((products) => {
        console.log(products)
        return products
      })
      .catch((err) => console.log(err))
  }

  static findById(prodId) {
    const db = getDb()
    return db
      .collection('products')
      .find({ _id: mongodb.ObjectId(prodId) })
      .next()
      .then((product) => {
        console.log(product)
        return product
      })
      .catch((err) => console.log(err))
  }

  static deleteById(prodId) {
    const db = getDb()
    return db
      .collection('products')
      .deleteOne({ _id: new mongodb.ObjectId(prodId) })
      .then((result) => {
        console.log('Deleted')
      })
      .catch((err) => console.log(err))
  }
}

// const Product = sequelize.define('product', {
//   id: {
//     type: Sequelize.INTEGER,
//     autoIncrement: true,
//     allowNull: false,
//     primaryKey: true,
//   },
//   title: {
//     type: Sequelize.STRING,
//     allowNull: false,
//   },
//   price: {
//     type: Sequelize.DOUBLE,
//     allowNull: false,
//   },
//   imageUrl: {
//     type: Sequelize.STRING,
//     allowNull: false,
//   },
//   description: {
//     type: Sequelize.STRING,
//     allowNull: false,
//   },
// })

module.exports = Product

// const db = require('../util/database')

// const Cart = require('./cart');

// module.exports = class Product {
//   constructor(id, title, imageUrl, description, price) {
//     this.id = id;
//     this.title = title;
//     this.imageUrl = imageUrl;
//     this.description = description;
//     this.price = price;
//   }

//   save() {
//     return db.execute(
//       'INSERT INTO products (title, price, imageUrl, description) VALUES (?, ?, ?, ?)',
//       [this.title, this.price, this.imageUrl, this.description]
//     );
//   }

//   static deleteById(id) {

//   }

//   static fetchAll() {
//     return db.execute('SELECT * FROM products');
//   }

//   static findById(id) {
//     return db.execute(`SELECT * FROM products WHERE products.id = ?`, [id]);
//   }

//   // static findById(id, cb) {
//   //   getProductsFromFile(products => {
//   //     const product = products.find(p => p.id === id)
//   //     cb(product);
//   //   })
//   // }
// };

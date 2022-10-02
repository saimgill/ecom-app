const path = require('path')

const express = require('express')

const rootDir = require('../util/path')
const adminData = require('./admin')

const router = express.Router()

router.get('/', (req, res, next) => {
  const prods = adminData.products
  res.render('shop', {prods: prods, pageTitle: 'Shop', path: '/shop'})
})


module.exports = router;
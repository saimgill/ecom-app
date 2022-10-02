const Product = require('../models/product');

exports.getProducts = (req, res, next) => {
  Product.fetchAll(products => {
    res.render('shop/product-list', {
      prods: products,
      pageTitle: 'Shop',
      path: '/',
      hasProducts: products.length > 0,
      activeShop: true,
      productCSS: true
    });
  });
};

exports.getEditProduct = (req, res, next) => {
  res.render('admin/edit-product', {
    pageTitle: 'Shop',
    path: '/edit-product'
  })
}

exports.getAdminProducts = (req, res, next) => {
  Product.fetchAll(products => {
    res.render('admin/products', {
      prods: products,
      pageTitle: 'Shop',
      path: '/products',
      hasProducts: products.length > 0,
      activeShop: true,
      productCSS: true
    });
  });
}

exports.getProductDetail = (res, req, next) => {
  res.render('shop/product-details')
}
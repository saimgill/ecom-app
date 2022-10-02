const path = require('path')

const express = require('express')
const bodyParser = require('body-parser')
const {engine} = require('express-handlebars')

const app = express()

app.engine('hbs', engine())
app.set('view engine', 'hbs') // temlete engine
app.set('views', 'views') //where to find

const adminData = require('./routes/admin')
const shopRoutes = require('./routes/shop')

app.use(bodyParser.urlencoded({extended: false}))
app.use(express.static(path.join(__dirname, 'public')))

app.use('/admin', adminData.routes)
app.use(shopRoutes)

app.use((req, res, next) => {
  res.status(404).render('404', {pageTitle: 'Page Not Found'})
})

app.listen(3000, () => {
  console.log('Your app is listening on port 8080')
})


// /module.exports = path.dirname(require.main.filename);
const express = require ('express')
const hbs = require('hbs')
const fs = require('fs')

var app = express()

hbs.registerPartials(__dirname + '/views/partials')
app.set('view engine', 'hbs')

app.use((req, res, next) => {
	var now = new Date().toString()
	var log = `${now}: ${req.method} ${req.url}`
	console.log(log)

	fs.appendFile('server.log', log + '\n', (err) => {
		if (err) {
			console.log('Unable to append server log')
		}
	})

	next();
})

app.use((req, res, next) => {
	res.render('maintanence.hbs')
})

app.use(express.static(__dirname + '/public'))

hbs.registerHelper('getCurrentYear', () => {
	return new Date().getFullYear()
})

hbs.registerHelper('screamIt', (text) => {
	return text.toUpperCase()
})

app.get('/', (req, res) => {
	// res.send('<h1>Hello Express!</h1>')
	res.send({
		name: 'Sam',
		likes: [
			'cities',
			'bikes'
		]
	}) 
})

app.get('/maintanence', (req, res) => {
	res.render('maintanence.hbs', {
		pageTitle: 'Maintanence',
		message: 'We will get back to you soon!'
	})
})

app.get('/home', (req, res) => {
	res.render('home.hbs', {
		pageTitle: 'Home Page',
		message: "Welcome to Home Page!"
	})
})

app.get('/about', (req, res) => {
	res.render('about.hbs', {
		pageTitle: 'About page'
	})
})

app.get('/bad', (req, res) => {
	res.send({
		status: '404',
		message: 'This is a bad request'
	})
})

app.listen(3000, () => {
	console.log('Server is up to port 3000')
})
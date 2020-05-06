const express = require('express')
const app = express()

// for form data
const multer = require('multer')
const upload = multer()

// for JSON data
const bodyParser = require('body-parser')
const jsonParser = bodyParser.json()

// Home page
app.get('/', (request, response) => {
  const helloFile = __dirname + '/views/index.html'
  response.sendFile(helloFile)
})

// Start listening to incoming requests at port number 3000
const listener = app.listen(3000, () => {
  console.log(`Your app is listening on port ${listener.address().port}`)
})

// Serve content of the "public" subfolder directly
app.use(express.static('public'))

// Handle form data submission to the "/animals" route
app.post('/animals', upload.array(), (request, response) => {
  const name = request.body.name
  const vote = request.body.strongest
  response.send(`Hello ${name}, you voted: ${vote}`)
})

// Handle submission of a JSON car array
app.post('/api/cars', jsonParser, (request, response) => {
  const cars = request.body
  response.send(`You sent me a list of cars: ${JSON.stringify(cars)}`)
})

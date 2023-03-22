const express = require('express')
var cors = require('cors')
const dotenv = require('dotenv');
dotenv.config();
const connectToMongo = require('./db');
connectToMongo();


const app = express();
const port = 5000;


app.use(cors())
app.use(express.json()) // so that we can use json while testing endpoint
app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.use('/api/auth', require('./routes/auth'))
app.use('/api/notes', require('./routes/notes'))

app.listen(port, () => {
  console.log(`http://localhost:${port}/`)
})
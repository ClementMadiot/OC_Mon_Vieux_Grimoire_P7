const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose');

const stuffRoutes = require('./routes/router')

//Connexion à MongoDB //
mongoose.connect('mongodb+srv://Johnathan08:43aL5qRSN3nbyRHk@cluster0.4nrbmuq.mongodb.net/?retryWrites=true&w=majority',
{ useNewUrlParser: true,
  useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));
  
const app = express();

app.use(express.json());
// CORS //
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});

app.use(bodyParser.json());

app.use('/api/books', stuffRoutes)
module.exports = app;
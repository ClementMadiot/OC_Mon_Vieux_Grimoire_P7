const express = require('express')
const mongoose = require('mongoose');
const dotenv = require('dotenv');


const stuffRoutes = require('./routes/router')
const userRoutes = require('./routes/user')

dotenv.config(),
//Connexion à MongoDB //
mongoose.connect(`mongodb+srv://${process.env.USER_NAME_MONGO}:${process.env.PASSWORD_MONGO}@cluster0.4nrbmuq.mongodb.net/?retryWrites=true&w=majority`,
{ useNewUrlParser: true,
  useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));
  
const app = express();
app.use(express.urlencoded({extended: true}));

app.use(express.json());
// CORS //
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});

// Racine router //
app.use('/images', express.static('images'));
app.use('/api/books', stuffRoutes);
app.use('/api/auth', userRoutes);


module.exports = app;
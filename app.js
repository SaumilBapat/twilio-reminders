// Required Packages
const express = require('express');
const bodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient;
const twilio = require('twilio');

// Required env variables
require('dotenv').config();
const nodeEnv = process.env.NODE_ENV;
const databaseUrl = process.env.DATABASE_URL;
const mongodbUsername = process.env.MONGODB_USERNAME;
const mongodbPassword = process.env.MONGODB_PASSWORD;
const mongodbUrl = process.env.MONGODB_URL;


const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

const mongoURI = 'mongodb+srv://saumil:cWFQwsUUFAxID5Ek@<hlojuwf/reminders?retryWrites=true&w=majority';
const client = new MongoClient(mongoURI, { useNewUrlParser: true });

const accountSid = 'AC429486261abd4c92654da23285e32221';
const authToken = '06cc9cf2fd54a96b5093b3b4cf0d6590';
const clientTwilio = twilio(accountSid, authToken);

app.post('/wordlist', (req, res) => {
  const word = req.body.word;
  const collection = client.db('words').collection('wordlist');
  collection.insertOne({ word }, (err, result) => {
    if (err) {
      return res.send({ success: false, message: 'Failed to add word to database.' });
    }
    clientTwilio.messages.create({
      to: '+16475002510',
      from: '+12023187339',
      body: word,
    })
    .then(() => res.send({ success: true, message: 'Word added to database and SMS sent.' }))
    .catch(() => res.send({ success: false, message: 'Failed to send SMS.' }));
  });
});

client.connect((err) => {
  if (err) {
    console.log('Failed to connect to database.');
    process.exit(1);
  }
  app.listen(3000, () => console.log('App is listening on port 3000.'));
});

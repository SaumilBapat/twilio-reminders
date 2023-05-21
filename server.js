const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const SendMessage = require('./MessagingClient');
const InvokeStudio = require('./StudioClient');

dotenv.config();
//hello
const app = express();

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const wordSchema = new mongoose.Schema({
  textReminder: String,
  backupReminder: String,
  time : Number,
  mobileNumber: String,
  backupMobileNumber: String,
  recordingUrl: String
});

const Word = mongoose.model('Word', wordSchema);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());



// Define an API endpoint to fetch data from the collection
app.get('/api/word', async (req, res) => {
  const words = await Word.find();
  res.json(words);
});

// Define an endpoint to update data in the collection based on it's Id and recording url 
app.post('/api/word/:id', async (req, res) => {

  if (req.body && req.body.RecordingUrl) {
    const words = await Word.updateOne({
      _id: req.params.id
    }, {
      recordingUrl: req.body.RecordingUrl
    });
    console.log('Word is updated!');
    console.log(req.body);
    console.log('~~~' + req.body.RecordingSid);
    res.send('Word is updated!');
  } else {
    console.log('Word is not updated!');
    console.log(req.body);
    console.log('~~~' + req.body.RecordingSid);
    res.send('Word is not updated!');
  }
});

// Define an API endpoint to create new data in the collection
app.post('/word', async (req, res) => {
  const newWord = new Word(req.body);
  SendMessage(newWord);
  await newWord.save();
  InvokeStudio(newWord);
  res.send(`Added word to the database.`);
});

// Delete Word Enpoint which deletes word with provided id
app.delete('/api/word/:id', async (req, res) => {
  const words =  await Word.deleteMany({
    _id: req.params.id
  });
  console.log(words);
  res.send('Word is deleted!');
});

// Delete All Words Enpoint which deletes all words
app.delete('/api/words', async (req, res) => {
  const words =  await Word.deleteMany({});
  console.log(words);
  res.send('All documents deleted!');
});

const path = require("path");
app.use(express.static('client/build'));
app.get('*', (req, res) => {
res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});

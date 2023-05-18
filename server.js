const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const SendMessage = require('./MessagingClient');
const MakeCall = require('./VoiceClient');

dotenv.config();
//hello
const app = express();

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const wordSchema = new mongoose.Schema({
  word: String,
  time : Number
});

const Word = mongoose.model('Word', wordSchema);

app.use(express.json());

// Define an API endpoint to fetch data from the collection
app.get('/api/word', async (req, res) => {
  const words = await Word.find();
  res.json(words);
});

app.post('/word', async (req, res) => {
  const word  = req.body;
  const newWord = new Word(word);
  SendMessage(word.word);
  MakeCall(word.word);
  await newWord.save();
  res.send(`Added "${word}" to the database.`);
});

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

const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

const app = express();

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const wordSchema = new mongoose.Schema({
  word: String,
});

const Word = mongoose.model('Word', wordSchema);

app.use(express.json());

app.get('/word', async (req, res) => {
  res.send(`You are connected to express`);
}); 
app.post('/word', async (req, res) => {
  const { word } = req.body;
  const newWord = new Word({ word });
  await newWord.save();
  res.send(`Added "${word}" to the database.`);
});

app.listen(process.env.PORT, () => {
  console.log(`Server listening on port ${process.env.PORT}`);
});

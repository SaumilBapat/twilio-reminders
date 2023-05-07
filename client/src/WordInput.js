import axios from 'axios';
import React, { useState } from 'react';

function WordInput({ onChildChange }) {
  const [word, setWord] = useState('');
  const [time, setTime] = useState(0);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await axios.post('/word', {word: word, time: time});
      alert(`Added ${word} : ${time} to database.`);
      setWord('');
    } catch (error) {
      console.log(JSON.stringify(error));
      alert(JSON.stringify(error));
      alert('Failed to add word to database.');
    }
    onChildChange(event.target.value);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Word:
        <input type="text" value={word} onChange={(event) => setWord(event.target.value)} />
        <input type="number" value={time} onChange={(event) => setTime(event.target.value)} />
      </label>
      <button type="submit">Add Word</button>
    </form>
  );
}

export default WordInput;

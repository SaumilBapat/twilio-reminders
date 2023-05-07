import axios from 'axios';
import React, { useState } from 'react';

function WordInput({ onChildChange }) {
  const [word, setWord] = useState('');
  const [time, setTime] = useState(0);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await axios.post('/word', {word: word, time: time});
      setWord('');
      setTime(0);
      onChildChange(time);
    } catch (error) {
      console.log(JSON.stringify(error));
      alert('Failed to add word to database.');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Reminder:
        <input type="text" value={word} onChange={(event) => setWord(event.target.value)} />
        <input type="number" value={time} onChange={(event) => setTime(event.target.value)} />
      </label>
      <button type="submit">Add Reminder</button>
    </form>
  );
}

export default WordInput;

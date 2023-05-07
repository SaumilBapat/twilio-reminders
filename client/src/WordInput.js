import axios from 'axios';
import React, { useState } from 'react';

function WordInput() {
  const [word, setWord] = useState({});

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await axios.post('/word', word);
      alert(`Added "${word}" to database.`);
      setWord('');
    } catch (error) {
      console.log(JSON.stringify(error));
      alert(JSON.stringify(error));
      alert('Failed to add word to database.');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Word:
        <input type="text" value={word.word} onChange={(event) => setWord(event.target.value)} />
        <input type="number" value={word.time} onChange={(event) => setWord(event.target.value)} />
      </label>
      <button type="submit">Add Word</button>
    </form>
  );
}

export default WordInput;

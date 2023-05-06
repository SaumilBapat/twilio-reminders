import axios from 'axios';
import React, { useState, useEffect } from 'react';

function WordOutput() {
  const [words, setWords] = useState([]);

  useEffect(() => {
    try {
      alert('fetching words');
      axios.get('/api/word')
      .then(response => setWords(response.data));
    } catch (error) {
      console.log(JSON.stringify(error));
      alert(JSON.stringify(error));
      alert('Failed to get words from database.');
    }
  }, []);

  return (
    <div>
      <h1>Words</h1>
      <ul>
        {words.map(word => (
          <li key={word._id}>
            <h2>{word.word}</h2>
            <p>{word.definition}</p>
            {word.example && <p><em>Example:</em> {word.example}</p>}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default WordOutput;

// This class is used to create a form to add a new word to the database.
import axios from 'axios';
import React, { useState } from 'react';

function WordInput({ onChildChange }) {
  const [textReminder, setTextReminder] = useState('');
  const [time, setTime] = useState(0);
  const [score, setScore] = useState(0);
  const [mobileNumber, setMobileNumber] = useState('');
  const [backupMobileNumber, setBackupMobileNumber] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await axios.post('/word', {textReminder: textReminder, time: time, score: score, mobileNumber: mobileNumber, backupMobileNumber: backupMobileNumber});
      setTextReminder('');
      setTime(0);
      setScore(0);
      setMobileNumber('');
      setBackupMobileNumber('');
      onChildChange(time);
    } catch (error) {
      console.log(JSON.stringify(error));
      alert('Failed to add word to database.');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        <b>Reminder:  </b>
        <input type="text" value={textReminder} onChange={(event) => setTextReminder(event.target.value)} /> <br/>
        <b>Time:  </b>
        <input type="number" value={time} onChange={(event) => setTime(event.target.value)} />  <br/>
        <b>Mobile Number:  </b>
        <input type="text" value={mobileNumber} onChange={(event) => setMobileNumber(event.target.value)} /> <br/>
        <b>Backup Mobile Number:  </b>
        <input type="text" value={backupMobileNumber} onChange={(event) => setBackupMobileNumber(event.target.value)} /> <br/>
      </label>
      <button type="submit">Add Reminder</button>      
    </form>
  );
}

export default WordInput;

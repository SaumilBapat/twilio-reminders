// This snipper displays all the reminders
import React, { useState } from 'react';
import WordInput from './WordInput';
import WordsOutput from './WordsOutput';
import WordsDelete from './WordsDelete';

function Words() {
  
  //Set parent State
  const [parentState, setParentState] = useState(0);

  //Set parent state from child
  const handleChildChange = () => {
    setParentState(prevState => prevState + 1);
  };

  return (
    <div>
      <h1>Add a Habit</h1>
      <WordInput parentState={parentState} onChildChange={handleChildChange} />
      <WordsOutput parentState={parentState} onChildChange={handleChildChange}/>
      <WordsDelete parentState={parentState} onChildChange={handleChildChange} />
    </div>
  );
}

export default Words;

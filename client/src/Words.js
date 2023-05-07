import React, { useState } from 'react';
import WordInput from './WordInput';
import WordsOutput from './WordsOutput';

function Words() {
  
  //Set parent State
  const [parentState, setParentState] = useState(0);

  //Set parent state from child
  const handleChildChange = (childState) => {
    setParentState(prevState => prevState + 1);
  };

  return (
    <div>
      <h1>Add a Word</h1>
      <WordInput parentState={parentState} onChildChange={handleChildChange} />
      <WordsOutput parentState={parentState}/>
    </div>
  );
}

export default Words;

import React, { useState } from 'react';
import WordInput from './WordInput';
import WordOutput from './WordOutput';

function Words() {
  //Set parent State
  const [parentState, setParentState] = useState('');

  //Set parent state from child
  const handleChildChange = (childState) => {
    setParentState(childState);
  };

  return (
    <div>
      <h1>Add a Word</h1>
      <WordInput onChildChange={handleChildChange} />
      <WordOutput />
    </div>
  );
}

export default Words;

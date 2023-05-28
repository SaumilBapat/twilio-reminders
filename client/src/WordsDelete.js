// This class is used to create a button to delete all words from the database.
import axios from 'axios';
import React, { Component } from 'react';

class WordsDelete extends Component {   
state = {};

  constructor(props) {
    super(props);
    this.state = props;
    this.deleteWords = this.deleteWords.bind(this);
  }

  deleteWords() {
    try {
        axios.delete('/api/words');
      } catch (error) {
        console.log(JSON.stringify(error));
        alert(JSON.stringify(error));
        alert('Failed to get words from database.');
      }
      this.state.onChildChange();
  }

  render() {
    return (
    <button onClick={this.deleteWords}>
      Delete All Reminders
    </button>
    );
  }
}

export default WordsDelete;
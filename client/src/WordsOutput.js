import axios from 'axios';
import React, { Component } from 'react';

class WordsOuput extends Component {
  constructor(props) {
    super(props);
    this.state = {
      words: []
    };
    this.refreshWords();
  }

  refreshWords() {
    try {
        axios.get('/api/word')
        .then(response => this.setState({words: response.data}));
      } catch (error) {
        console.log(JSON.stringify(error));
        alert(JSON.stringify(error));
        alert('Failed to get words from database.');
      }
  }

  handleChange = (event) => {
    this.setState({ name: event.target.value });
  };

  componentDidUpdate(prevProps, prevState) {
    if (this.props.parentState !== prevProps.parentState) {
        this.refreshWords();
    }
  }

  render() {
    return (
      <div>
        <ul>
              {this.state.words.map(word => (
                <li key={word._id}>
                  <p><b>Reminder</b> {word.word}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<b>Time</b> {word.time}</p>
                </li>
              ))}
        </ul>
      </div>
    );
  }
}

export default WordsOuput;
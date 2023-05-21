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

  refreshWords(domain) {
    if (!domain) {
      domain = '/api/word';
    } else {
      domain = domain + '/api/word';
    }
    try {
        axios.get(domain)
        .then(response => this.setState({words: response.data}));
      } catch (error) {
        console.log(JSON.stringify(error));
        alert(JSON.stringify(error));
        alert('Failed to get words from database.');
      }
  }
  deleteWord(wordId) {
    try {
        axios.delete('/api/word/' + wordId)
        .then(response => this.refreshWords());
      } catch (error) {
        console.log(JSON.stringify(error));
        alert(JSON.stringify(error));
        alert('Failed to delete word from database.');
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
                  <p>
                    <button type="submit" onClick={(event) => this.deleteWord(word._id)}>Delete Reminder</button> 
                    <b>Id</b> {word._id} <br/>
                    <b>Reminder</b> {word.textReminder} <br/>
                    <b>Time</b> {word.time} <br/>
                    <b>Mobile Number</b> {word.mobileNumber} <br/>
                    <b>Backup Mobile Number</b> {word.backupMobileNumber} <br/>
                    <b>Recording Url</b> {word.recordingUrl} <br/>
                  </p>
                </li>
              ))}
        </ul>
      </div>
    );
  }
}

export default WordsOuput;
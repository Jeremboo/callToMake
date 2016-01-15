import React from 'react';

class MyTranslation extends React.Component {
  constructor(props) {
    super(props);

    const newRecognition = new webkitSpeechRecognition();
    newRecognition.continuous = true;
    newRecognition.lang = 'fr-FR';

    newRecognition.onresult = (event) => {
      this.state.speechs.push(event.results[event.results.length - 1][0].transcript);
      console.log(event.results);

      this.translation();
    }

    this.state = {
      recognition: newRecognition,
      target: null,
      speechs: []
    };

  }

  componentDidMount() {
    this.setState({target: document.getElementById('sentance')});
  }

  translation() {
    const xhr = new XMLHttpRequest();

    xhr.onload = (e) => {
      const data = JSON.parse(xhr.responseText);
      this.state.target.textContent += this.state.speechs[this.state.speechs.length - 1] + " => " + data.responseData.translatedText + " / ";
      console.log(this);
      mySocket.emit('voice', data.responseData.translatedText);
    }

    xhr.open("GET", "http://api.mymemory.translated.net/get?q=" + this.state.speechs[this.state.speechs.length - 1] + "&langpair=fr|en", false);
    xhr.send();
  }

  handleStart() {
    this.state.recognition.start();
  }
  handleStop() {
    this.state.recognition.stop();
  }
  render() {

    return (
      <div className="mytranslation">
        <h2>My Translation :</h2>
        <p>Veuillez dicter votre phrase :</p>
        <button onClick={this.handleStart}>Commencer l'enregistrement</button>
        <button onClick={this.handleStop}>Arréter l'enregistrement</button>
        <p id="sentance"></p>
      </div>
    )
  }
}

export default MyTranslation;

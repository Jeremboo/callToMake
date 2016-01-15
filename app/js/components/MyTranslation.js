import React from 'react';
import HeaderPage from './HeaderPage';
import { mySocket } from '../index';

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

    mySocket.on('pickup', () => {
      this.state.recognition.start();
    });

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

  handleStop() {
    this.state.recognition.stop();
  }

  render() {

    return (
      <div className="mytranslation">
        <HeaderPage title="My Translation" />
        <p className="citation">Veuillez dicter votre phrase en utilisant le combiné du téléphone :</p>
        <a href="javascript:void(0)" className="button" onClick={this.handleStop}>STOP !</a>
        <p id="sentance"></p>
      </div>
    )
  }
}

export default MyTranslation;

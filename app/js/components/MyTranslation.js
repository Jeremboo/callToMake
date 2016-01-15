import React from 'react';
import HeaderPage from './HeaderPage';
import { rotatyPhoneSocket } from '../index';

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

    rotatyPhoneSocket.on('pickup', () => {
      this.state.recognition.start();
    });

    this.state = {
      recognition: newRecognition,
      target: false,
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
      rotatyPhoneSocket.emit('voice', data.responseData.translatedText);
    }

    xhr.open("GET", "http://api.mymemory.translated.net/get?q=" + this.state.speechs[this.state.speechs.length - 1] + "&langpair=fr|en", false);
    xhr.send();
  }

  handleStop() {
    console.log("recognition stop");
    this.state.recognition.stop();
  }

  render() {

    return (
      <div className="mytranslation">
        <HeaderPage title="My Translation" />
        <p className="citation">Veuillez dicter votre phrase en utilisant le combiné du téléphone :</p>
        <a href="javascript:void(0)" className="button" onClick={this.handleStop.bind(this)}>STOP !</a>
        <p id="sentance"></p>
      </div>
    )
  }
}

export default MyTranslation;

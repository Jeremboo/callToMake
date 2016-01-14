import React from 'react'
import { render } from 'react-dom'

// First we import some components...
import { Router, Route, Link, History } from 'react-router'
const mySocket = io.connect('http://192.168.3.2:7777');

const Menu = React.createClass({
  render: function() {
    return (
      <ul>
        <li><Link to="/mytranslation">My Translation</Link></li>
        <li>Fonctionnalité 2</li>
        <li>Fonctionnalité 3</li>
        <li>Fonctionnalité 4</li>
        <li>Fonctionnalité 5</li>
      </ul>
    )
  }
});

const Meteo = React.createClass({
  getInitialState: function() {
    return{
      position: {
        latitude: 0,
        longitude: 0
      }
    }
  },
  componentDidMount: function() {
    let position = {};
    //this.setState({position: {latitude: 0, longitude: 0}}) ;

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        console.log(pos);
        this.setState({position: pos.coords});
      },
      (err) => {
        this.setState({ position: {} });
        console.warn('ERROR(' + err.code + '): ' + err.message);
      }
    );
  },
  render: function() {
    console.log(this.state.position);
    const src = "http://forecast.io/embed/#lat=" + this.state.position.latitude + "&lon=" + this.state.position.longitude + "&units=si";
    return(
      <div className="meteo">
        <iframe id="forecast_embed" type="text/html" frameBorder="0" height="245" width="100%" src={src} > </iframe>
      </div>
    )
  }
});

const MyTranslation = React.createClass({
  getInitialState: function() {
    const newRecognition = new webkitSpeechRecognition();
    newRecognition.continuous = true;
    newRecognition.lang = 'fr-FR';

    newRecognition.onresult = (event) => {
      this.state.speechs.push(event.results[event.results.length - 1][0].transcript);
      console.log(event.results);

      this.translation();
    }

    return {
      recognition: newRecognition,
      target: null,
      speechs: []
    }
  },
  componentDidMount: function() {
    this.setState({target: document.getElementById('sentance')});
  },
  translation: function() {
    const xhr = new XMLHttpRequest();

    xhr.onload = (e) => {
      const data = JSON.parse(xhr.responseText);
      this.state.target.textContent += this.state.speechs[this.state.speechs.length - 1] + " => " + data.responseData.translatedText + " / ";
      console.log(this);
      mySocket.emit('voice', data.responseData.translatedText);
    }

    xhr.open("GET", "http://api.mymemory.translated.net/get?q=" + this.state.speechs[this.state.speechs.length - 1] + "&langpair=fr|en", false);
    xhr.send();
  },
  handleStart: function() {
    console.log(this);
    this.state.recognition.start();
  },
  handleStop: function() {
    this.state.recognition.stop();
  },
  render: function() {
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
});

// Then we delete a bunch of code from App and
// add some <Link> elements...
const App = React.createClass({
  mixins: [ History ],
  getInitialState: function() {
    mySocket.on('channel', (channel) => {
      if (channel == 1) {
        console.log('go to channel 1');
        this.history.pushState(null, '/mytranslation');
      }

      if (channel == 2) {
        console.log('go to channel 2');
        this.history.pushState(null, '/meteo');
      }
    });

    // Menu is active by default
    this.context.history.pushState(null, '/menu');

    return {};
  },
  render() {
    return (
      <div>
        <header>
          <h1>Call To Make</h1>
        </header>
        {this.props.children}
      </div>
    )
  }
})

// Finally, we render a <Router> with some <Route>s.
// It does all the fancy routing stuff for us.
render((
  <Router>
    <Route path="/" component={App}>
      <Route path="menu" component={Menu} socket={App} />
      <Route path="mytranslation" component={MyTranslation} />
      <Route path="meteo" component={Meteo} />
    </Route>
  </Router>
), document.getElementById('wrapper'))

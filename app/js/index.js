import React from 'react'
import { render } from 'react-dom'
import { Router, Route, Link, History } from 'react-router'

import Menu from './components/Menu';
import Meteo from './components/Meteo';
import MyTranslation from './components/MyTranslation';

// ##
// CONNECTION TO ROTARY PHONE
const mySocket = io.connect('http://192.168.2.2:2345');
//TODO trouver automatiquement l'adresse ID grace a electron.

mySocket.on('connected', (channel) => {
  console.log("Connected");
});

mySocket.on('error', (errorMessage) => {
  console.error(errorMessage);
});


// ##
// APP
const App = React.createClass({
  mixins: [ History ],
  getInitialState: function() {
    mySocket.on('channel', (channel) => {
      console.log("numero composed :" + channel);

      if (channel == 1) {
        console.log('go to channel ' + channel);
        this.history.pushState(null, '/mytranslation');
      }

      if (channel == 2) {
        console.log('go to channel 2');
        this.history.pushState(null, '/meteo');
      }
    });

    mySocket.on('pickup', () => {
      console.log("pickup");
    });

    mySocket.on('hangup', () => {
      console.log("hangup");
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
});


// ##
// DOM RENDER
render((
  <Router>
    <Route path="/" component={App}>
      <Route path="menu" component={Menu} socket={App} />
      <Route path="mytranslation" component={MyTranslation} />
      <Route path="meteo" component={Meteo} />
    </Route>
  </Router>
), document.getElementById('wrapper'))

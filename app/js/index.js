import React from 'react'
import { render } from 'react-dom'
import { Router, Route, Link, History } from 'react-router'

import Menu from './components/Menu';
import Meteo from './components/Meteo';
import MyTranslation from './components/MyTranslation';
import Wifi from './components/Wifi';

// ##
// var
let wifiActived = true; // TODO mettre dans APP

// ##
// CONNECTION TO ROTARY PHONE & DESCKTOP
//TODO trouver automatiquement l'adresse ID grace a electron.
export const rotatyPhoneSocket = io.connect('http://192.168.2.2:2345', { 'force new connection': true });
const descktopSocket = io.connect('http://localhost:3334', { 'force new connection': true });

rotatyPhoneSocket.on('connected', () => {
  console.log("Phone connected");
});
rotatyPhoneSocket.on('error', (errorMessage) => {
  console.error(errorMessage);
});

descktopSocket.on('connected', () => {
  console.log("Descktop connected");
});

// ##
// APP
const App = React.createClass({
  mixins: [ History ],
  getInitialState: function() {
    // ROTARY PHONE SOCKET
    rotatyPhoneSocket.on('channel', (channel) => {
      console.log("numero composed :" + channel);

      switch (channel) {
        case 0:
          this.history.pushState(null, '/mytranslation');
          break;
        case 1:
          this.history.pushState(null, '/meteo');
          break;
        case 2:
          this._toggleWifi();
          break;
        case 3:
          descktopSocket.emit('screenCapture');
          break;
        case 4:
          descktopSocket.emit('openApp', "Google Chrome");
          break;
        case 5:
          descktopSocket.emit('sleepnow');
          break;
        case 6:
          descktopSocket.emit('openApp', "Adobe Photoshop CC 2015");
          // TODO ouvrir un truc avec la commande vocale
          break;
        case 7:
          break;
        case 8:
          break;
        case 9:
          //TODO ajouter la prise de photo avec webcam
          descktopSocket.emit('imagesnap');
          break;
        default:
          console.log("ERROR : number not recognized :" + channel);
      }
    });

    rotatyPhoneSocket.on('pickup', () => {
      console.log("pickup");
      this._setIsPick(true);
    });

    rotatyPhoneSocket.on('hangup', () => {
      console.log("hangup");
      this._setIsPick(false);
    });

    // Menu is active by default
    this.context.history.pushState(null, '/menu');

    return {
      phoneConnected: false,
      descktopConnected: false,
      isPick : false
    };
  },

  _setIsPick: function(isPick){
    this.setState({isPick : isPick});
  },

  _toggleWifi: function(){
    wifiActived = !wifiActived;
    descktopSocket.emit('toggleWifi', wifiActived);
    this.history.pushState(null, '/wifi');
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
      <Route path="wifi" component={Wifi} wifiStatus={wifiActived} />
    </Route>
  </Router>
), document.getElementById('wrapper'))

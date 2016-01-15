import React from 'react'
import { Link } from 'react-router'

class Menu extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <ul>
        <li><Link to="/mytranslation">My Translation</Link></li>
        <li><Link to="/meteo">My Meteo</Link></li>
        <li>Toggle Wifi</li>
        <li>ScreenShot</li>
        <li>Sleepnow</li>
        <li>Open navigator</li>
        <li>Open Photoshop</li>
      </ul>
    )
  }
}

export default Menu;

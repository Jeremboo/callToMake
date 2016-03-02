import React from 'react'
import { Link } from 'react-router'

class Menu extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <ul>
        <li><Link to="/mytranslation">1_ English translate</Link></li>
        <li><Link to="/meteo">2_ My Meteo</Link></li>
        <li>3_ Toggle Wifi</li>
        <li>4_ ScreenShot</li>
        <li>5_ Sleepnow</li>
        <li>6_ Open navigator</li>
        <li>7_ Open Photoshop</li>
      </ul>
    )
  }
}

export default Menu;

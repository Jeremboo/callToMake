import React from 'react'
import Link from 'react-router'

class Menu extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
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
}

export default Menu;

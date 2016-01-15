import React from 'react'
import { Link } from 'react-router'

class HeaderPage extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="headerpage">
        <Link to="/menu"><img src="img/back.png" /></Link>
        <h2>{this.props.title}</h2>
      </div>
    )
  }
}

export default HeaderPage;

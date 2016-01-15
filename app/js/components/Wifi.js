import React from 'react';

class Wifi extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {}

  render() {
    console.log(this.props);
    let s = "";
    if(this.props.route.wifiStatus){
      s = "enable";
    } else {
      s = "disable";
    }

    return (
      <div className="bluetooth">
        <h2>Wifi :</h2>
        <p>{s} wifi.</p>
      </div>
    )
  }
}

export default Wifi;

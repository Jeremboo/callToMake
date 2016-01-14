import React from 'react';

class Meteo extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      position: {
        latitude: 0,
        longitude: 0
      }
    }
  }

  componentDidMount() {
    let position = {};

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        this.setState({position: pos.coords});
      },
      (err) => {
        console.warn('ERROR(' + err.code + '): ' + err.message);
      }
    );
  }
  render() {
    const src = "http://forecast.io/embed/#lat=" + this.state.position.latitude + "&lon=" + this.state.position.longitude + "&units=si";
    return(
      <div className="meteo">
        <iframe id="forecast_embed" type="text/html" frameBorder="0" height="245" width="100%" src={src} > </iframe>
      </div>
    )
  }
}

export default Meteo;

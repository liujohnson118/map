import React, { useState, useCallback } from 'react';
import './App.css';
import {GoogleMap, useJsApiLoader, StandaloneSearchBox, Circle} from "@react-google-maps/api";

const divStyle = {
  width: '1000px',
  height: '1000px'
};

const mapContainerStyle = {
  width: '800px',
  height: '800px'
};

const mapCentre = {
  lat: 51.0447,
  lng: -114.0719
};

const circleOptions = {
  strokeColor: '#FF0000',
  strokeOpacity: 0.8,
  strokeWeight: 2,
  fillColor: '#FF0000',
  fillOpacity: 0.35,
  clickable: false,
  draggable: false,
  editable: false,
  visible: true,
  zIndex: 1
}

const onLoad = circle => {
  console.log('Circle onLoad circle: ', circle)
}

const onUnmount = circle => {
  console.log('Circle onUnmount circle: ', circle)
}


function App() {
  const googleMapsApiKey = process.env.REACT_APP_GOOGLE_MAP_API_KEY

  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey
  })

  const [map, setMap] = useState(null)
  const [address, setAddress] = useState(null)
  const [radius, setRadius] = useState(1000)
  const [circles, setCircles] = useState([])

  const onLoad = useCallback(function callback(map) {
    // This is just an example of getting and using the map instance!!! don't just blindly copy!
    const bounds = new window.google.maps.LatLngBounds(mapCentre);
    map.fitBounds(bounds);

    setMap(map)
  }, [])

  const onUnmount = useCallback(function callback(map) {
    setMap(null)
  }, [])

  const createAddressQuery = (str) => (str.split(' ').join('+'))

  const handleSubmit = (event) => {
    event.preventDefault();

    fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${createAddressQuery(address)}&key=${googleMapsApiKey}`)
        .then((res) => res.json()).then(({ results }) => {
          if(results.length){
            setCircles([...circles, {...results[0].geometry.location, radius }])
          }
    })
  }

  const onLoadCircle = circle => {
    console.log('Circle onLoad circle: ', circle)
  }

  const onUnmountCircle = circle => {
    console.log('Circle onUnmount circle: ', circle)
  }

  return isLoaded ? (
      <>
        <div style={divStyle}>
          <GoogleMap
              mapContainerStyle={mapContainerStyle}
              mapCentre={mapCentre}
              zoom={1}
              onLoad={onLoad}
              onUnmount={onUnmount}
          >
            { /* Child components, such as markers, info windows, etc. */ }
            {(circles).map((circleData) => (<Circle center={circleData} options={{...circleData, radius: circleData.radius}}
            ></Circle>))}
            <></>
          </GoogleMap>
          <form onSubmit={handleSubmit}>
            <label>
              Address:
              <input type="text" name="Address"
                     onChange={(event) => setAddress(event.target.value)} />
            </label>
            <label>
              Radius in KM:
              <input type="number" name="km"
                     onChange={(event) => setRadius(event.target.value * 1000)} />
            </label>
            <input type="submit" value="Submit" />
          </form>
        </div>
        <div>
        </div>
      </>
  ) : <></>
}

export default App;

import React, { useState, useCallback } from 'react';
import './App.css';
import GoogleMapsService from "./services/GoogleMapsService";
import GoogleMapDisplay from "./components/GoogleMapDisplay";
import DistanceCircleForm from "./components/DistanceCircleForm";
import CirclesTable from "./components/CirclesTable";

const floatLeftChildStyle = {
  border: '1px solid red',
  width: '40%',
  float: 'left'
};

const floatRightChildStyle = {
  border: '1px solid red',
  width: '40%',
  float: 'right'
};

const mapCentre = {
  lat: 51.0447,
  lng: -114.0719
};

function App() {
  const [map, setMap] = useState(null)
  const [address, setAddress] = useState(null)
  const [radius, setRadius] = useState(1000)
  const [circles, setCircles] = useState([])

  const onLoad = useCallback(function callback(map) {
    const bounds = new window.google.maps.LatLngBounds(mapCentre);
    map.fitBounds(bounds);

    setMap(map)
    map.setZoom(7)
  }, [])

  const onUnmount = useCallback(function callback() {
    setMap(null)
  }, [])

  const onSubmit = (event) => {
    event.preventDefault();

    GoogleMapsService.searchByAddress(address).then(({ results }) => {
          if(results.length){
            const locationData = results[0]
            const { geometry, formatted_address } = locationData
            setCircles([...circles, {...geometry.location, radius, formatted_address }])
          }
    })
  }
  return (
      <>
        <div>
          <div style={floatLeftChildStyle}>
            <GoogleMapDisplay circles={circles} onLoad={onLoad} onUnmount={onUnmount} />)
          </div>
          <div style={floatRightChildStyle}>
            <DistanceCircleForm setAddress={setAddress} setRadius={setRadius} onSubmit={onSubmit} />
          </div>
          <div style={floatRightChildStyle}>
            <CirclesTable circles={circles}/>
          </div>
        </div>
      </>
  )
}

export default App;

import React, { useState, useCallback } from 'react';
import './App.css';
import {GoogleMap, useJsApiLoader, Circle} from "@react-google-maps/api";
import GoogleMapsService from "./services/GoogleMapsService";
import GoogleMapDisplay from "./components/GoogleMapDisplay";
import DistanceCircleForm from "./components/DistanceCircleForm";

const floatChildStyle = {
  display: 'inline-block',
  border: '1px solid red',
  width: '650px',
  margin: '20px'
};

const floatContainerStyle = {
  border: '3px solid #fff',
  width: '1600px',
  height: '1600px',
}

const mapContainerStyle = {
  width: '500px',
  height: '500px'
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


function App() {
  const [map, setMap] = useState(null)
  const [address, setAddress] = useState(null)
  const [radius, setRadius] = useState(1000)
  const [circles, setCircles] = useState([])

  const onLoad = useCallback(function callback(map) {
    const bounds = new window.google.maps.LatLngBounds(mapCentre);
    map.fitBounds(bounds);

    setMap(map)
  }, [])

  const onUnmount = useCallback(function callback(map) {
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
        <div style={floatContainerStyle} className={'float-container'}>
          <div style={floatChildStyle} className={'float-child'}>
            <GoogleMapDisplay circles={circles} onLoad={onLoad} onUnmount={onUnmount} />)
          </div>
          <div style={floatChildStyle} className={'float-child'}>
            <DistanceCircleForm setAddress={setAddress} setRadius={setRadius} onSubmit={onSubmit} />
          </div>
        </div>
      </>
  )
}

export default App;

import React from 'react';
import {GoogleMap, Circle, useJsApiLoader} from "@react-google-maps/api";
import PropTypes from 'prop-types'

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


function GoogleMapDisplay({ circles, onLoad, onUnmount }) {
    const googleMapsApiKey = process.env.REACT_APP_GOOGLE_MAP_API_KEY

    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey
    })

    if(!isLoaded){
        return (<></>)
    }
    return (
        <>
            <GoogleMap
                mapContainerStyle={mapContainerStyle}
                mapCentre={mapCentre}
                onLoad={onLoad}
                onUnmount={onUnmount}
                zoom={7}
            >
                {(circles)
                    .map((circleData) => (<Circle center={circleData} options={{...circleOptions, radius: circleData.radius}}
                    ></Circle>))}
                <></>
            </GoogleMap>
        </>
    )
}

GoogleMapDisplay.propTypes = { circles: PropTypes.array.isRequired, onLoad: PropTypes.func.isRequired,
    onUnmount: PropTypes.func.isRequired }

export default GoogleMapDisplay;

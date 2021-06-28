import './App.css';
import React, { useState ,useEffect } from 'react';
import ReactMapGL, { Marker,Popup } from 'react-map-gl';
import * as parkDate from "./data/skateboard-parks.json";
export default function App() {

  const [viewport, setViewport] = useState({
    latitude: 45.4211,
    longitude: -75.6903,
    zoom: 10,
    width: "100vw",
    height: "100vh",
    // pitch :50
  });

  const [selectedPark, setselectedPark] = useState(null);

  useEffect(()=>{
    const listener = e =>{
      if(e.key==="Escape")
      {
        setselectedPark(null);
      }
    };
    window.addEventListener("keydown",listener);
    return ()=>{
      window.removeEventListener("keydown",listener);
    };
    
  },[]);

  return (
    <div>
      <h2>Implementation Using dataset
      </h2>
      <ReactMapGL
        mapStyle={'mapbox://styles/mapbox/dark-v9'}
        mapboxApiAccessToken={'pk.eyJ1Ijoic3Rta3Nua3IiLCJhIjoiY2txY2cybG1kMHRmYTJvcXNqMGk3NHJpZCJ9.jopWEsZEEN_iQ1URCh3FfQ'}
        {...viewport}
        onViewportChange={(viewport) => {
          setViewport(viewport);
        }}
      >
        {parkDate.features.map(park => (
          <Marker
            key={park.properties.PARK_ID}
            latitude={park.geometry.coordinates[1]}
            longitude={park.geometry.coordinates[0]}
          >
            <button
            className="marker-btn" 
            onClick={ e => {
              e.preventDefault();
              setselectedPark(park)
            }}
            >
              <img src="/skateboarding.svg" alt="Skate Park Icon" />
            </button>
          </Marker>
        ))}

        {selectedPark ? (
          <Popup
            latitude={selectedPark.geometry.coordinates[1]}
            longitude={selectedPark.geometry.coordinates[0]}
            onClose={()=>{
              setselectedPark(null);
            }}
            >
            <div>
              <h2>{selectedPark.properties.NAME}</h2>
              <p>{selectedPark.properties.DESCRIPTO}</p>
            </div>
          </Popup>
        ) : null}
      </ReactMapGL>
      </div>
  );
}  

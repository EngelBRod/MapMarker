import React, { useState } from "react";
import Map from "./components/Map";

function App() {
  const [markers, setMarkers] = useState([]);
  const onMapClick = (e) => {
    setMarkers((current) => [
      ...current,
      {
        lat: e.latLng.lat(),
        lng: e.latLng.lng()
      }
    ]);
  };

  return(
    <>
      <h1>Map Selector</h1>
      <Map markers={markers} onMapClick={onMapClick} />
    </>
  );
}

export default App;

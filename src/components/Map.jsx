import React from "react";
import uuid from "react-uuid";
import {
  GoogleMap,
  useLoadScript,
  MarkerF,
} from "@react-google-maps/api";

function Map({onMapClick, markers}) {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAP_API_KEY,
  });

  return (
    <div style={{ width: "100%", height: "90vh" }}>
      {isLoaded ? (
        <GoogleMap
          center={{ lat: 40.3947365, lng: 49.6898045 }}
          zoom={10}
          mapContainerStyle={{
            width: "100%",
            height: "90vh",
          }}
          onClick={onMapClick}
        >
          {markers.map((marker,index) => (
            <MarkerF
              key={uuid()}
              label={ (index+1).toString()}
              position={{
                lat: marker.lat,
                lng: marker.lng,
              }}
            />
          ))}
        </GoogleMap>
      ) : null}
    </div>
  );
}

export default Map;
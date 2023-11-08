import React from "react";
import uuid from "react-uuid";

function MarkersInfo({ markers }) {
  return (
    <div className="overflow">
      {markers.map((value, index) => (
        <div key={uuid}>
          {`Quest${index + 1}: `}
          <p className="mb-0">{` latitude: ${value.lat}`}</p>
          <p className="mb-0">{`longitude: ${value.lng}`}</p>
        </div>
      ))}
    </div>
  );
}

export default MarkersInfo;

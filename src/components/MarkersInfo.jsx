import React from "react";
import uuid from "react-uuid";

function MarkersInfo({markers}){
    return(
        markers.map((value,index)=> <div key={uuid}>{`Quest${index+1}: { latitude: ${value.lat} longitude: ${value.lng} }`}</div> )
    )
}

export default MarkersInfo;
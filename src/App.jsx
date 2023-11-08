import React, { useRef, useState } from "react";
import Map from "./components/Map";
import LinkedList from "./utilities/LinkedList";

function App() {
  const [markers, setMarkers] = useState([]);
  const linkedList = useRef(null);


  const formatData = (quest)=>{
    let temp
    if(linkedList.current==null){
       temp = new LinkedList(quest);
    }else{
       temp = linkedList.current;
       temp.push(quest);
    }    
    
    linkedList.current = temp;

    temp =temp.head
    let formatter = `{"Quest${temp.value.Quest}":{"latitude": ${temp.value.latitude},"longitude":${temp.value.longitude}},"next":null}`
    temp = temp.next; 
    // eslint-disable-next-line no-plusplus
    for(let i=1; i < linkedList.current.size ; i++){
      const tempValue = `"Quest${temp.value.Quest}":{"latitude":${temp.value.latitude},"longitude":${temp.value.longitude}},"next":null`;
      formatter = formatter.replace('null', `{${tempValue}}`);
      
      temp = temp.next; 
    }
    const result = JSON.parse(formatter)
    console.log(result);
    return result;
  }
  const onMapClick = (e) => {
    setMarkers((current) => [
      ...current,
      {
        lat: e.latLng.lat(),
        lng: e.latLng.lng()
      }      
    ]);
    
    const quest = {
      Quest:(markers.length+1),
      latitude:e.latLng.lat(),
      longitude:e.latLng.lng(),
    }
    test.current = formatData(quest);


  };


  return(
    <>
      <h1>Map Selector</h1>
      <Map markers={markers} onMapClick={onMapClick} />
    </>
  );
}

export default App;

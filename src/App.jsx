import React, { useRef, useState } from "react";
import { addDoc, collection, doc, updateDoc  } from "@firebase/firestore";
import LinkedList from "./utilities/LinkedList";
import firebase from "./utilities/Firebase";
import Map from "./components/Map";

function App() {
  const [markers, setMarkers] = useState([]);
  const linkedList = useRef(null);
  const ref= collection(firebase,"Quests");
  const currentCollection = useRef('5psoSkPhMS50TZgBU4lQ');
 


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
    let formatter = `{"Quest${temp.value.Quest}":{"latitude": ${temp.value.latitude},"longitude":${temp.value.longitude},"next":null}}`
    temp = temp.next; 
    // eslint-disable-next-line no-plusplus
    for(let i=1; i < linkedList.current.size ; i++){
      const tempValue = `"Quest${temp.value.Quest}":{"latitude":${temp.value.latitude},"longitude":${temp.value.longitude},"next":null}`;
      formatter = formatter.replace('null', `{${tempValue}}`);
      
      temp = temp.next; 
    }
    const result = JSON.parse(formatter)
    console.log(result);
    return result;
  }

  const sendData = (data)=>{
    
    if(markers.length===0){
      try {
      addDoc(ref,data)
      .then((res)=>{
        currentCollection.current =res.id;
      })
      }catch(e){
        console.log(e);
      }
    }else{
      const refData = doc(firebase,"Quests",currentCollection.current);
      try {
        updateDoc(refData,data);
      }catch(e){
        console.log(e);
      }
    }

 
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
  
   const data = formatData(quest);
   sendData(data);

  };




  return(
    <>
      <h1>Map Selector</h1>
      <Map markers={markers} onMapClick={onMapClick} />
    </>
  );
}

export default App;

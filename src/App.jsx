import React, { useRef, useState } from "react";
import { addDoc, collection, doc, updateDoc } from "@firebase/firestore";
import LinkedList from "./utilities/LinkedList";
import firebase from "./utilities/Firebase";
import Map from "./components/Map";
import MapHeader from "./components/MapHeader";

function App() {
  const [markers, setMarkers] = useState([]);
  const [location, setLocation] = useState({ lat: 28.9445, lng: -82.0336 });

  const linkedList = useRef(null);
  const ref = collection(firebase, "Quests");
  const currentCollection = useRef();

  const getLocation = (e) => {
    e.preventDefault();

    const country = e.target.country.value;

    fetch(
      `https://api.mapbox.com/geocoding/v5/mapbox.places/${country}.json?access_token=${
        import.meta.env.VITE_mapbox_key
      }&limit=1`,
    )
      .then((res) => res.json())
      .then((response) => {
        setLocation({
          lat: response.features[0].center[1],
          lng: response.features[0].center[0],
        });
      });
  };

  const formatData = (quest) => {
    let temp;
    if (linkedList.current == null) {
      temp = new LinkedList(quest);
    } else {
      temp = linkedList.current;
      temp.push(quest);
    }

    linkedList.current = temp;

    temp = temp.head;
    let formatter = `{"Quest${temp.value.Quest}":{"latitude": ${temp.value.latitude},"longitude":${temp.value.longitude},"next":null}}`;
    temp = temp.next;
    // eslint-disable-next-line no-plusplus
    for (let i = 1; i < linkedList.current.size; i++) {
      const tempValue = `"Quest${temp.value.Quest}":{"latitude":${temp.value.latitude},"longitude":${temp.value.longitude},"next":null}`;
      formatter = formatter.replace("null", `{${tempValue}}`);

      temp = temp.next;
    }
    const result = JSON.parse(formatter);
    console.log(result);
    return result;
  };

  const sendData = (data) => {
    if (markers.length === 0) {
      try {
        addDoc(ref, data).then((res) => {
          currentCollection.current = res.id;
        });
      } catch (e) {
        console.log(e);
      }
    } else {
      const refData = doc(firebase, "Quests", currentCollection.current);
      try {
        updateDoc(refData, data);
      } catch (e) {
        console.log(e);
      }
    }
  };

  const onMapClick = (e) => {
    setMarkers((current) => [
      ...current,
      {
        lat: e.latLng.lat(),
        lng: e.latLng.lng(),
      },
    ]);
    setLocation(null);

    const quest = {
      Quest: markers.length + 1,
      latitude: e.latLng.lat(),
      longitude: e.latLng.lng(),
    };

    const data = formatData(quest);
    sendData(data);
  };

  return (
    <div className="container-fluid h-100">
      <div className="row d-flex flex-column">
        <div className="col-12 p-0">
          
          <MapHeader getLocation={getLocation} markers={markers} />
        </div>
        <div className="col-12 px-0">
          <Map markers={markers} onMapClick={onMapClick} location={location} />
        </div>
      </div>
    </div>
  );
}

export default App;

import React from "react";
import '../styles/App.css'
import { Nav, Button, } from "react-bootstrap";
import { GeoAlt } from 'react-bootstrap-icons'

function MapHeader({ getLocation, markers }) {
  return (
    <header className="bg-light p-4">
      <div className="d-flex justify-content-between m-2">
      <div className="display-5">Map Selector<GeoAlt/></div>
      <div className="display-5">{`Markers ${ markers.length}`}</div>
      </div>

      <Nav> 
          <form className="input-group m-2" onSubmit={getLocation}>
            <input type="text" className="form-control" name="country" />
            <Button type="button" className="btn btn-dark">Location</Button>
          </form>
      </Nav>
    </header>

  );
}

export default MapHeader;

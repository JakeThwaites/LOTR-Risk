import React from "react";
import MapArea from "./MapArea";
import areaPaths from './svgPaths/AreaPaths';

function MapAreas(props) {
  const areas = areaPaths.map(function(a) {
    return (
      <MapArea 
        className={a === props.attackingArea ? 'attacker' : a === props.defendingArea ? 'defender' : a.region}
        id={a.areaName}
        path={a.path}
        onClick={() => props.onClick(a)}
      />
    )
  });
  return (
    <>
      {areas}
    </>
  )
};

export default MapAreas;
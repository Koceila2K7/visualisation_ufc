/* eslint-disable no-nested-ternary */
import React, { useState } from 'react';
import {
  Circle,
  MapContainer,
  Popup,
  TileLayer,
  useMapEvents,
  GeoJSON,
} from 'react-leaflet';
import { useDispatch, useSelector } from 'react-redux';
import * as d3 from 'd3';
import mapData from '../data/contries.geo.json';
import { UFC_DATA_FILTER_LOCATION, UFC_DATA_FILTER_PAYS } from '../constants';

function getKey() {
  return `${new Date().getSeconds()} - ${Math.random() * 10000} `;
}

function getcolorFunction(d) {
  return d > 1000
    ? '#800026'
    : d > 500
    ? '#BD0026'
    : d > 200
    ? '#E31A1C'
    : d > 100
    ? '#FC4E2A'
    : d > 50
    ? '#FD8D3C'
    : d > 20
    ? '#FEB24C'
    : d > 10
    ? '#FED976'
    : d > 10
    ? '#FFEDA0'
    : '#FFFFFF00';
}

const countryStyle = {
  fillOpacity: 0.8,
  color: 'black',
  weight: 0.8,
};
function MyComponent({ disableFilter }) {
  // eslint-disable-next-line no-unused-vars
  const map = useMapEvents({
    click: () => {
      disableFilter();
    },
  });
  return null;
}
function InnerMap({
  contriesMatches,
  handleLocationFilter,
  location,
  locationMatches,
  handlePaysFilter,
}) {
  const onEachCountry = (country, layer) => {
    const countryName = country.properties?.admin?.toLowerCase();

    // eslint-disable-next-line no-param-reassign
    layer.options.fillColor = getcolorFunction(
      contriesMatches.get(countryName)
    ); // 0-1 (0.1, 0.2, 0.3)
    // eslint-disable-next-line no-param-reassign
    layer.options.fillOpacity = 0.8;
    layer.on({
      click: handlePaysFilter(countryName),
    });
  };

  const [zoom, setZoomLevel] = useState(5);

  const mapEvents = useMapEvents({
    zoomend: () => {
      setZoomLevel(mapEvents.getZoom());
    },
  });

  const disableFilter = () => {
    const a = handleLocationFilter(null);
    const b = handlePaysFilter(null);
    return () => {
      a();
      b();
    };
  };

  return zoom < 4 ? (
    <>
      <MyComponent disableFilter={disableFilter()} />
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <GeoJSON
        key={getKey()}
        style={{ ...countryStyle }}
        data={mapData.features}
        onEachFeature={onEachCountry}
      />
    </>
  ) : (
    <>
      <MyComponent disableFilter={disableFilter()} />
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {Array.from(locationMatches.entries()).map((el) => {
        const [l, v] = el;
        const { gpsLang, gpsLat } = location[l];
        return (
          <Circle
            key={l}
            radius={v < 300 ? v * 1000 : v * 100}
            color="red"
            fillColor="#f03"
            center={[gpsLat, gpsLang]}
            eventHandlers={{ dblclick: handleLocationFilter(l) }}
          >
            <Popup>
              <h1>{v}</h1>
            </Popup>
          </Circle>
        );
      })}
    </>
  );
}

export default function Maps() {
  const ufcData = useSelector((globalState) => globalState.ufcReducer.ufcData);

  const dispatch = useDispatch();
  const handleLocationFilter = (payload) => (event) => {
    event?.originalEvent.view.L.DomEvent.stopPropagation(event);
    dispatch({ type: UFC_DATA_FILTER_LOCATION, payload });
  };
  const handlePaysFilter = (payload) => (event) => {
    // console.log(payload);
    event?.originalEvent.view.L.DomEvent.stopPropagation(event);
    dispatch({ type: UFC_DATA_FILTER_PAYS, payload });
  };

  const location = useSelector(
    (globalState) => globalState.ufcReducer.location
  );
  const locationMatches = d3.rollup(
    ufcData,
    (g) => g.length,
    (d) => d.location
  );

  const contriesMatches = d3.rollup(
    ufcData,
    (g) => g.length,
    (d) => d.pays
  );

  return (
    <MapContainer
      style={{ height: '400px' }}
      center={[51.505, -0.09]}
      zoom={5}
      scrollWheelZoom
      tap={handleLocationFilter(null)}
    >
      <InnerMap
        handleLocationFilter={handleLocationFilter}
        contriesMatches={contriesMatches}
        location={location}
        handlePaysFilter={handlePaysFilter}
        locationMatches={locationMatches}
        data={ufcData}
      />
    </MapContainer>
  );
}

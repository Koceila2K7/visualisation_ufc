import React from 'react';
import {
  Circle,
  MapContainer,
  Popup,
  TileLayer,
  useMapEvents,
} from 'react-leaflet';
import { useDispatch, useSelector } from 'react-redux';
import * as d3 from 'd3';
import { UFC_DATA_FILTER_LOCATION } from '../constants';

function MyComponent({ disableFilter }) {
  // eslint-disable-next-line no-unused-vars
  const map = useMapEvents({
    click: () => {
      disableFilter();
    },
  });
  return null;
}
export default function Maps() {
  const ufcData = useSelector((globalState) => globalState.ufcReducer.ufcData);

  const dispatch = useDispatch();
  const handleLocationFilter = (payload) => (event) => {
    event?.originalEvent.view.L.DomEvent.stopPropagation(event);
    dispatch({ type: UFC_DATA_FILTER_LOCATION, payload });
  };

  const location = useSelector(
    (globalState) => globalState.ufcReducer.location
  );
  const locationMatches = d3.rollup(
    ufcData,
    (g) => g.length,
    (d) => d.location
  );

  return (
    <MapContainer
      style={{ height: '400px' }}
      center={[51.505, -0.09]}
      zoom={5}
      scrollWheelZoom
      tap={handleLocationFilter(null)}
    >
      <MyComponent disableFilter={handleLocationFilter(null)} />
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
            radius={v < 1000 ? v * 300 : v * 100}
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
    </MapContainer>
  );
}

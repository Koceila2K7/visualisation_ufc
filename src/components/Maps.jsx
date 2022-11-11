import React from 'react';
import { Circle, MapContainer, Popup, TileLayer } from 'react-leaflet';
import { useSelector } from 'react-redux';
import * as d3 from 'd3';

export default function Maps() {
  const ufcData = useSelector(
    (globalState) => globalState.ufcReducer.ufcData.data
  );
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
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {Array.from(locationMatches.entries()).map((el) => {
        const [l, v] = el;
        const { gpsLang, gpsLat } = location[l];
        return (
          <Circle
            radius={v < 1000 ? v * 300 : v * 100}
            color="red"
            fillColor="#f03"
            center={[gpsLat, gpsLang]}
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
/** {Array.from(locationMatches.entries()).map((l, v) => (
        <Marker position={location[l]}>
          <Popup>{v}</Popup>
        </Marker>
      ))} */

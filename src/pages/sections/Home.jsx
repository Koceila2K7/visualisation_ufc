import { Grid } from '@mui/material';
import * as d3 from 'd3';

import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';
import { useSelector } from 'react-redux';
import { Container } from '@mui/system';

ChartJS.register(ArcElement, Tooltip, Legend);

export default function Home() {
  const ufcData = useSelector((globalState) => globalState.ufcReducer.ufcData);
  // console.log(d3.group(ufcData.data.data, el=>el.location))
  const weightClass = d3.rollup(
    ufcData.data,
    (g) => g.length,
    (d) => d.weight_class
  );
  const weightClassData = {
    labels: Array.from(weightClass.keys()),
    datasets: [
      {
        label: 'Nombre de matchs par catégorie',
        data: Array.from(weightClass.values()),
        backgroundColor: [
          'rgba(255, 99, 132, .2)',
          'rgba(54, 162, 235, .2)',
          'rgba(255, 206, 86, .2)',
          'rgba(75, 192, 192, .2)',
          'rgba(153, 102, 255, .2)',
          'rgba(255, 159, 64, .2)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  return (
    <Container>
      <Grid container spacing={5} style={{ padding: 4 }}>
        <Grid item xs={6}>
          <div>
            <MapContainer
              style={{ height: '400px', marginTop: 2 }}
              center={[51.505, -0.09]}
              zoom={13}
              scrollWheelZoom
            >
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              <Marker position={[51.505, -0.09]}>
                <Popup>
                  A pretty CSS3 popup. <br /> Easily customizable.
                </Popup>
              </Marker>
            </MapContainer>
          </div>
        </Grid>
        <Grid item xs={6}>
          <Pie data={weightClassData} />
        </Grid>
      </Grid>
    </Container>
  );
}

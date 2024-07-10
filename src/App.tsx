import React from 'react';
import { NavigationComponent } from './components/NavigationComponent';
import { APIProvider, Map, } from '@vis.gl/react-google-maps';
// import { NavigationComponent } from './components/NavigationComponent';
import UserInputOutput from './components/UserInputOutput';
const start = { lat: 40.713536, lng: -74.011223 };
// const end = { lat: 40.7484405, lng: -73.985664 };


export const App = () => {

  const API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

  const MAP_ID = "ID";


  return (
    <div style={{ display: 'flex' }}>
      <APIProvider apiKey={API_KEY}>
        <Map
          style={{ width: '90vw', height: '90vh' }}
          defaultCenter={start}
          defaultZoom={13}
          gestureHandling={'greedy'}
          disableDefaultUI={true}
          mapId={MAP_ID}
        />
        <NavigationComponent />
        <UserInputOutput />
      </APIProvider>
    </div>
  );
}


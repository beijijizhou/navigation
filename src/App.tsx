import React from 'react';

import { APIProvider, Map,} from '@vis.gl/react-google-maps';
import { RoutesComponent } from './components/RoutesComponent';
import SearchBar from './components/SearchBar';
const start = { lat: 40.713536, lng: -74.011223 };
// const end = { lat: 40.7484405, lng: -73.985664 };


function App() {
  
  const API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

  const MAP_ID = "ID";


  return (
    <div style={{display: 'flex'}}>
    <APIProvider apiKey={API_KEY}>
      <Map
        style={{ width: '90vw', height: '90vh' }}
        defaultCenter={start}
        defaultZoom={13}
        gestureHandling={'greedy'}
        disableDefaultUI={true}
        mapId={MAP_ID}        
      />
      <RoutesComponent />
      <SearchBar/>
    </APIProvider>
    </div>
  );
}

export default App;
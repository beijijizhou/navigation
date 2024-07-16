// import React from 'react';
import { NavigationComponent } from './components/NavigationComponent';
import { APIProvider, Map, } from '@vis.gl/react-google-maps';
// import { NavigationComponent } from './components/NavigationComponent';
import UserInputOutput from './components/UserInputOutput';
import { useEffect } from 'react';
import useStore from './store';
import { getPosition } from './NavigationService/getPosition';

export const App = () => {

  const API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;
  const MAP_ID = "ID";
  const { origin } = useStore();
  useEffect(() => {
    if (!origin) {
      // alert("Please allow us to access your current location")
      getPosition();
    }
    
  }, [origin])
  return (
    <div style={{ display: 'flex' }}>
      <APIProvider apiKey={API_KEY}>
        <Map
          style={{ width: '90vw', height: '90vh' }}
          defaultCenter={origin as google.maps.LatLngLiteral}
          defaultZoom={13}
          mapId={MAP_ID}
        />
        <NavigationComponent />
        <UserInputOutput />
      </APIProvider>
    </div>
  );
}


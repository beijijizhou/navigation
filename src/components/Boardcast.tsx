// src/components/SpeechSynthesis.tsx
/* eslint-disable @typescript-eslint/no-unused-vars */
import { useEffect, useState } from 'react';
import useStore from '../store';
import { AdvancedMarker } from '@vis.gl/react-google-maps';
import { originLocationType } from '../Type';
import { calculateDistance } from '../utils/calculateDistance';
import { NavigationStatus } from '../store/useNavigationSlice';


export default function Boardcast() {
  const { currentDirectionsRoute, origin, setNavigationServiceStatus, navigationServiceStatus } = useStore.getState();
  const [stepInedx, setStepIndex] = useState(0);
  const [legs, setLegs] = useState<google.maps.DirectionsLeg>();
  const [endLocation, setEndLocation] = useState<originLocationType>();
  const endService = "Your Destination Has arrrived"
  // const client = new v1.TextToSpeechClient();

  const extractInstructions = (text: string) => {
    return { __html: text };
  };

  useEffect(() => {
    if (currentDirectionsRoute) {
      console.log(currentDirectionsRoute)
      if (!legs) {
        setLegs(currentDirectionsRoute.legs[0])
      } 
    }

  }, [currentDirectionsRoute, legs])

  useEffect(() =>{
    
  },[navigationServiceStatus])

  const navigationServiceEnds =()=>{
    setNavigationServiceStatus(NavigationStatus.Completed);
    
  }
 
  useEffect(() => {
    const getEndLocation = () => {
      const lat = legs!.steps[stepInedx].end_location.lat()
      const lng = legs!.steps[stepInedx].end_location.lng()
      const end_location = {
        lat,
        lng
      }
      setEndLocation(end_location)
    }

    if (origin && legs) {
      console.log('Origin updated:', origin);
      if (!endLocation) {
        getEndLocation()
      } else {
        const d = calculateDistance(endLocation, origin)
        console.log("distance from origin to current endLocation", d)
        if (d < 10) {
          if(stepInedx == legs.steps.length){
            navigationServiceEnds()
          }
          setStepIndex(prev => prev + 1)
          getEndLocation()
        }
      }
    }

  }, [origin, endLocation, legs, stepInedx])
  return (
    <div>
      {legs && (
        <div>
          <p style={{ fontSize: '12px' }}>
            BoardCast: <br />
            Distantce: {legs.distance!.text}<br />
            Time: {legs.duration!.text}<br />
          </p>
          <p style={{ fontSize: '12px' }}>
            Current instructions:<br />
            {legs.steps[stepInedx].distance?.text} <br />
            Current street:
          </p>
          <p style={{ fontSize: '12px' }} dangerouslySetInnerHTML={extractInstructions(currentDirectionsRoute!.legs[0].steps[stepInedx].instructions)} />
          <p></p>
          {endLocation && <AdvancedMarker position={endLocation}></AdvancedMarker>}
        </div>
      )}
    </div>
  )
}


// src/components/SpeechSynthesis.tsx
/* eslint-disable @typescript-eslint/no-unused-vars */
import { useEffect, useState } from 'react';
import useStore from '../store';
import { AdvancedMarker } from '@vis.gl/react-google-maps';
import { originLocationType } from '../Type';
import { calculateDistance } from '../utils/calculateDistance';
import { NavigationStatus } from '../store/useNavigationSlice';


export default function Broadcast() {
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
    const navigationServiceEnds = () => {
      setNavigationServiceStatus(NavigationStatus.Completed);
      
    }
    const getEndLocation = () => {
      const lat = legs!.steps[stepInedx].end_location.lat()
      const lng = legs!.steps[stepInedx].end_location.lng()
      const end_location = {
        lat,
        lng
      }
      setEndLocation(end_location)
    }
    const navigationServiceInProgress = () => {
      const d = calculateDistance(endLocation!, origin!)
      console.log("distance", d)
      if (d < 10) {
        console.log(stepInedx, legs!.steps.length)
        if (stepInedx == legs!.steps.length - 1) {
          navigationServiceEnds()

        }
        else {
          setStepIndex(prev => prev + 1)
          getEndLocation()
        }

      }
    }

    if (!currentDirectionsRoute) return
    if (!legs) {
      setLegs(currentDirectionsRoute.legs[0])
      return
    }
    if (!endLocation) {
      getEndLocation()
      return
    }
    if (navigationServiceStatus == NavigationStatus.InProgress) {
      navigationServiceInProgress()
    }
  }, [currentDirectionsRoute, origin, endLocation, legs, stepInedx, setNavigationServiceStatus, navigationServiceStatus])
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

          {endLocation && <AdvancedMarker position={endLocation}></AdvancedMarker>}
          {navigationServiceStatus == NavigationStatus.Completed && <p>{endService} </p>}
        </div>
      )}
    </div>
  )
}


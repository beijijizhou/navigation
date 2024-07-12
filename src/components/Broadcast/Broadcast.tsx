// src/components/SpeechSynthesis.tsx
/* eslint-disable @typescript-eslint/no-unused-vars */
import { useEffect, useRef, useState } from 'react';
import useStore from '../../store';
import { AdvancedMarker, Pin } from '@vis.gl/react-google-maps';
import { originLocationType } from '../../Type';
import { calculateDistance } from '../../utils/calculateDistance';
import { NavigationStatus } from '../../store/useNavigationSlice';
import useSpeech from '../../utils/txtToSpeech.tsx'

export default function Broadcast() {
  const { currentDirectionsRoute, origin, setNavigationServiceStatus, navigationServiceStatus } = useStore.getState();
  const [stepInedx, setStepIndex] = useState(0);
  const [legs, setLegs] = useState<google.maps.DirectionsLeg>();
  const [endLocation, setEndLocation] = useState<originLocationType>();
  const endService = "Your Destination Has arrrived"

  const extractInstructions = (text: string) => {
    return { __html: text };
  };
  const removeHTML = (text: string) => {
    return text.replace(/(<([^>]+)>)/ig, '')
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
      if (d < 5) {
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

  const prevInstructions = useRef('')

  useEffect(() => {
    if (currentDirectionsRoute) {
      let instructions = removeHTML(currentDirectionsRoute!.legs[0].steps[stepInedx].instructions)
      if (prevInstructions.current !== instructions) {
        useSpeech(instructions)
      }
      prevInstructions.current = instructions
    }
  }, [currentDirectionsRoute])

  
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


          </p>
          <p style={{ fontSize: '12px' }} dangerouslySetInnerHTML={extractInstructions(currentDirectionsRoute!.legs[0].steps[stepInedx].instructions)} >

          </p>
          <p style={{ fontSize: '12px' }} >
            {legs.steps[stepInedx].distance?.text} <br />
          </p>
          {endLocation && <AdvancedMarker position={endLocation}>
          {/* <img src={destinationFlagURL} width={32} height={32} /> */}
          <Pin
                                background={'#000000'}
                                borderColor={'#006425'}
                                glyphColor={'#60d98f'}
                            />
          </AdvancedMarker>}
          {navigationServiceStatus == NavigationStatus.Completed && <p>{endService} </p>}
        </div>
      )}
    </div>
  )
}


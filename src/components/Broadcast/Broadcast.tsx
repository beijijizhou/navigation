// src/components/SpeechSynthesis.tsx
/* eslint-disable @typescript-eslint/no-unused-vars */
import { useEffect, useRef} from 'react';
import useStore from '../../store';
import { AdvancedMarker, Pin } from '@vis.gl/react-google-maps';
import { NavigationStatus } from '../../store/useNavigationSlice';
import { calculateDistanceToCurrentEndLocation, getEndLocation } from '../../utils/navigationUtil/navigation';
import textToSpeech from '../../utils/txtToSpeech.tsx'
export default function Broadcast() {
  const { currentDirectionsRoute, origin, setNavigationServiceStatus, navigationServiceStatus, stepIndex,legs, setLegs, currentEndLocation: endLocation, setCurrentEndLocation: setEndLocation } = useStore.getState();
  const { distanceToCurrentEndLocation, remainingTime, setRemainingTime,setDistanceToCurrentEndLocation} = useStore.getState();
  const endService = "Your Destination Has arrrived"

  const extractInstructions = (text: string) => {
    return { __html: text };
  };
  const removeHTML = (text: string) => {
    return text.replace(/(<([^>]+)>)/ig, '')
  };

  useEffect(() => {
    if (!currentDirectionsRoute) return
    if(!remainingTime){
      const time = currentDirectionsRoute.legs[0].duration
      setRemainingTime(time!.text)
    }

    if (!legs) {
      setLegs(currentDirectionsRoute.legs[0])
      return
    }
    if (!endLocation) {
      setEndLocation(getEndLocation(legs!,stepIndex))
      return
    }
    if(!distanceToCurrentEndLocation){
      const distance = calculateDistanceToCurrentEndLocation(endLocation,origin as google.maps.LatLngLiteral)
      setDistanceToCurrentEndLocation(distance)
    }
  }, [currentDirectionsRoute,distanceToCurrentEndLocation, setDistanceToCurrentEndLocation,setEndLocation,setLegs,origin, endLocation, legs, stepIndex, setNavigationServiceStatus, navigationServiceStatus,remainingTime, setRemainingTime])

  const prevInstructions = useRef('')

  useEffect(() => {
    if (currentDirectionsRoute) {
      const instructions = removeHTML(currentDirectionsRoute!.legs[0].steps[stepIndex].instructions)
      if (prevInstructions.current !== instructions) {
        textToSpeech(instructions)
      }
      prevInstructions.current = instructions
    }

  }, [currentDirectionsRoute, stepIndex])


  return (
    <div>
      {legs && (
        <div>
          <p style={{ fontSize: '12px' }}>
            BoardCast: <br />
            Distantce: {legs.distance!.text}<br />
            Time: {remainingTime}<br />
          </p>
          <p style={{ fontSize: '12px' }}>
            Current instructions:<br />
          </p>
          <p style={{ fontSize: '12px' }} dangerouslySetInnerHTML={extractInstructions(currentDirectionsRoute!.legs[0].steps[stepIndex].instructions)} >

          </p>
          <p style={{ fontSize: '12px' }} >
            in {distanceToCurrentEndLocation} meters <br />
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


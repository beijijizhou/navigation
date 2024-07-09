// src/components/SpeechSynthesis.tsx
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useState } from 'react';
import useStore from '../store';
import { v1, v1beta1, TextToSpeechClient, TextToSpeechLongAudioSynthesizeClient } from '@google-cloud/text-to-speech';


export default function Boardcast() {
  const { currentDirectionsRoute, origin } = useStore.getState();
  const [stepInedx, setStepIndex] = useState(0);
  // const client = new v1.TextToSpeechClient();

  const extractInstructions = (text:string) => {
    return { __html: text };
  };

  useEffect(() => {
    if (currentDirectionsRoute) {
      console.log(currentDirectionsRoute)
    }
    
  }, [currentDirectionsRoute, origin])
  return (
    <div>
      {currentDirectionsRoute && (
        <div>
          <p style={{ fontSize: '12px' }}>
            BoardCast: <br />
            Distantce: {currentDirectionsRoute!.legs[0]!.distance!.text}<br />
            Time: {currentDirectionsRoute!.legs[0]!.duration!.text}<br />
          </p>
          <p style={{ fontSize: '12px' }}>
            Current instructions:<br />
            {currentDirectionsRoute!.legs[0].steps[stepInedx].distance?.text} <br />
            Current street: 
          </p>
          <p style={{ fontSize: '12px' }} dangerouslySetInnerHTML={extractInstructions(currentDirectionsRoute!.legs[0].steps[stepInedx].instructions)} />

          
        </div>
      )}
    </div>
  )
}


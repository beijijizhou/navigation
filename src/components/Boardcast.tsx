// src/components/SpeechSynthesis.tsx
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect } from 'react';
import useStore from '../store';
import  { v1, v1beta1, TextToSpeechClient, TextToSpeechLongAudioSynthesizeClient } from '@google-cloud/text-to-speech';


export default function Boardcast() {
  const { currentDirectionsRoute } = useStore.getState();
  const client = new v1.TextToSpeechClient();

  const getDuration = () => {
    const time = currentDirectionsRoute?.legs[0].duration
    return time;
  }
  const textToSpeech = async () => {
    const text = getDuration()?.text;
    const request = {
      input: { text: text },
      // Select the language and SSML voice gender (optional)
      voice: { languageCode: 'en-US', ssmlGender: 'NEUTRAL' as const},
      // select the type of audio encoding
      // audioConfig: { audioEncoding: 'MP3' },
    };
    await client.synthesizeSpeech(request);
  }
  useEffect(() => {
    textToSpeech()

  })
  return (
    <div>SpeechSynthesis</div>
  )
}


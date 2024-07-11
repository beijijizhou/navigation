// import textToSpeech from '@google-cloud/text-to-speech';

// Creates a client
// const client = new textToSpeech.TextToSpeechClient();

async function quickStart(): Promise<void> {
  // The text to synthesize
  // const text: string = 'hello, world!';

  // Construct the request
    
  // const request: textToSpeech.protos.google.cloud.texttospeech.v1.ISynthesizeSpeechRequest = {
  //   input: { text: text },
  //   // Select the language and SSML voice gender (optional)
  //   voice: { languageCode: 'en-US', ssmlGender: 'NEUTRAL' },
  //   // select the type of audio encoding
  //   audioConfig: { audioEncoding: 'MP3' },
  // };

  try {
    // Performs the text-to-speech request
    // const [response] = await client.synthesizeSpeech(request);

    // Access the binary audio content directly
    // const audioContent = response.audioContent as Buffer;
    console.log('Audio content received');

    // Use the audioContent as needed within your application
    // For example, you could play the audio using the Web Audio API in a browser environment

  } catch (error) {
    console.error('ERROR:', error);
  }
}

// Call the function to perform the text-to-speech request
quickStart();

// quickStart();
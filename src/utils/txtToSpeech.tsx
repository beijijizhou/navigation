async function useSpeech(text: string): Promise<void> {
  try {
    const synth = window.speechSynthesis;
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 0.9;
    synth.speak(utterance);
  } catch (error) {
    console.error('Text-to-speech error:', error);
  }
}

export default useSpeech;

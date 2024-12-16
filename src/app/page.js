"use client";

import * as Tone from "tone";

import { useState, useEffect } from "react";

export default function Home() {
  const [audioStarted, setAudioStarted] = useState(false);
  const [synth, setSynth] = useState(null);
  const [audioSupported, setAudioSupported] = useState(null); // Tone.js:n tuki

  // C h e c k  T o n e . j s  s u p p o r t
  useEffect(() => {
      const supportsAudio = typeof AudioContext !== "undefined" || typeof webkitAudioContext !== "undefined";
      setAudioSupported(supportsAudio);
  }, []);

  // s t a r t  a u d i o  c o n t e x t  a n d  c r e a t e  s y n t h
  const startAudio = async () => {
    let context = Tone.getContext();
    if (context.state !== "running" || !audioStarted) {
      try {
        await Tone.start();
        let newSynth = new Tone.Synth().toDestination();        
        setSynth(newSynth);
        setAudioStarted(true);
        console.log("Audio Context Started");
      } catch (error) {
        console.error("Error starting audio context:", error);
      }
    }
  };

  const playNote = () => {
    synth.triggerAttackRelease("C4", "8n");
  };

    // I f  T o n e . j s  i s  n o t  s u p p o r t e d
    if (audioSupported === false) {
      return (
          <div className="flex flex-col items-center justify-center h-screen">
              <p className="text-red-500 text-lg">Selaimesi ei tue tarvittavia ääniominaisuuksia. Päivitä selain tai kokeile toista selainta.</p>
          </div>
      );
    }

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      {!audioStarted ? (
        <button
          className="px-4 py-2 border-4 text-lg rounded-3xl text-blue-500 border-blue-500 hover:bg-blue-500 hover:text-gray-50"
          onClick={startAudio}
        >
          Start Audio
        </button>
      ) : (
        <button
          className="px-4 py-2 border-4 text-lg rounded-3xl text-green-500 border-green-500 hover:bg-green-500 hover:text-gray-50"
          onClick={playNote}
        >
          Play Note
        </button>
      )}
    </div>
  );
}


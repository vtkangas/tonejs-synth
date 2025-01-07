"use client";

import * as Tone from "tone";
import { useState, useEffect } from "react";
import Knob from "@/components/Knob";
import WaveformSelector from "@/components/WaveformSelector";
import FilterSelector from "@/components/filterSelector";

export default function Home() {
  const [audioStarted, setAudioStarted] = useState(false);
  const [synth, setSynth] = useState(null);
  const [audioSupported, setAudioSupported] = useState(null); // Tone.js:n tuki

  const [synthSettings, setSynthSettings] = useState({
    oscillatorType: "sine",
    filterType: "low-pass",
  });

  const updateSynthSettings = (newSettings) => {
    setSynthSettings(newSettings);
  };

  // C h e c k  T o n e . j s  s u p p o r t
  useEffect(() => {
    const supportsAudio =
      typeof AudioContext !== "undefined" ||
      typeof webkitAudioContext !== "undefined";
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

  // I f  T o n e . j s  i s  n o t  s u p p o r t e d ! ! !
  if (audioSupported === false) {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <p className="text-red-500 text-lg">
          Your browser does not support the audio element. Please update your
          browser to the latest version or try another browser like Chrome,
          Firefox, or Edge.
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      {!audioStarted ? (
        <button
          className="px-4 py-2 border-4 text-lg rounded-3xl 
          text-blue-500 border-blue-500 hover:bg-blue-500 hover:text-gray-50"
          onClick={startAudio}
        >
          Start Audio
        </button>
      ) : (
        <>
          <button
            className="px-4 py-2 border-4 mb-6 text-lg rounded-3xl 
            text-green-500 border-green-500 hover:bg-green-500 hover:text-gray-50"
            onClick={playNote}
          >
            Play Note
          </button>
          <div className="mb-4">
            <WaveformSelector
              synthSettings={synthSettings}
              updateSynthSettings={updateSynthSettings}
            />
          </div>
          <div className="mb-4">
            <FilterSelector
              synthSettings={synthSettings}
              updateSynthSettings={updateSynthSettings}
            />
          </div>
            <Knob
              theme="pink"
              label="Volume"
              valueDefault={0.5}
              valueMin={0}
              valueMax={1}
              stepFn={(value) => 0.05} //these are for keyboard input
              stepLargerFn={(value) => 0.1} //these are for keyboard input
              valueRawDisplayFn={(value) => `${(value * 100).toFixed(0)}%`}
              orientation={"vertical"}
            />
        </>
      )}
    </div>
  );
}

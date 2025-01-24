"use client";

import useSynth from "@/hooks/useSynth";
import Synth from "@/components/synth/Synth";
import Delay from "@/components/effects/Delay";
import Reverb from "@/components/effects/Reverb";
import Phaser from "@/components/effects/Phaser";
import Vibrato from "@/components/effects/Vibrato";
import Keyboard from "@/components/Keyboard";

export default function SynthRack() {
  const {
    audioSupported,
    audioStarted,
    synthSettings,
    startAudio,
    playNote,
    stopNote,
    updateSynthSettings,
    handleVolumeChange,
    feedbackDelay,
    reverb,
    phaser,
    vibrato,
  } = useSynth();

  // I f  T o n e . j s  i s  n o t  s u p p o r t e d ! ! !
  if (audioSupported === false) {
    return (
      <div className="flex flex-col items-center justify-center h-screen w-screen mx-auto p-10">
        <p className="text-red-500 text-lg max-w-2xl">
          Your browser does not support the audio element. Please update your
          browser to the latest version or try another browser like Chrome,
          Firefox, or Edge.
        </p>
      </div>
    );
  }

  return (
    <div
      style={{
        touchAction: "none", // Prevent touch actions
        userSelect: "none", // Prevent text selection
        WebkitUserSelect: "none", // Prevent text selection on WebKit
        MozUserSelect: "none", // Prevent text selection on Firefox
        msUserSelect: "none", // Prevent text selection on older IE/Edge
      }}
    >
      {!audioStarted ? (
        <div className="flex flex-col items-center justify-center h-screen w-screen">
          <button
            className="px-4 py-2 border-4 text-lg rounded-3xl 
          text-blue-500 border-blue-500 hover:bg-blue-500 hover:text-gray-50"
            onClick={startAudio}
          >
            Start Audio
          </button>
        </div>
      ) : (
        <div className="grid grid-rows-10 w-screen h-[100svh] overflow-hidden z-0">
          {/* synth and effects */}
          <div
            className="flex flex-row row-span-7 items-center overflow-hidden 
            landscape:row-span-8 
            w-screen overflow-x-auto snap-x snap-mandatory scroll-smooth p-4 bg-blue-200 gap-2"
          >
              <div className="flex items-center h-full scroll-ml-3 snap-start snap-always">
                <Synth
                  synthSettings={synthSettings}
                  updateSynthSettings={updateSynthSettings}
                  handleVolumeChange={handleVolumeChange}
                />
              </div>
              <div className="flex h-full gap-2">
                <div className="flex items-center h-full scroll-ml-2 snap-start snap-always">
                  <Delay delay={feedbackDelay} />
                </div>
                <div className="flex items-center h-full scroll-ml-2 snap-start">
                  <Reverb reverb={reverb} />
                </div>
                <div className="flex items-center h-full scroll-ml-2 snap-start">
                  <Phaser phaser={phaser} />
                </div>
                <div className="flex items-center h-full scroll-ml-2 snap-start">
                  <Vibrato vibrato={vibrato} />
                </div>
              </div>
          </div>
          {/* keyboard */}
          <div className="flex row-span-3 landscape:row-span-2 h-full w-screen bg-pink-500 overflow-x-auto overflow-y-hidden">
            <Keyboard playNote={playNote} stopNote={stopNote} />
          </div>
        </div>
      )}
    </div>
  );
}

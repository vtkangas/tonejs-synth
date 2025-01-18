"use client";

import useSynth from "@/hooks/useSynth";
import Synth from "@/components/Synth";

export default function SynthRack() {
  const {
    audioSupported,
    audioStarted,
    synthRef,
    synthSettings,
    startAudio,
    playNote,
    stopNote,
    updateSynthSettings,
    handleVolumeChange,
  } = useSynth();

  // I f  T o n e . j s  i s  n o t  s u p p o r t e d ! ! !
  if (audioSupported === false) {
    return (
      <div className="flex flex-col items-center justify-center w-96 h-screen mx-auto p-10">
        <p className="text-red-500 text-lg">
          Your browser does not support the audio element. Please update your
          browser to the latest version or try another browser like Chrome,
          Firefox, or Edge.
        </p>
      </div>
    );
  }

  return (
    <div>
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
        <div className="grid grid-rows-10 w-screen h-screen overflow-hidden z-0">
          {" "}
          {/* synth and effects */}
          <div className="flex flex-row row-span-7 landscape:row-span-8 w-screen overflow-x-auto overflow-y-hidden p-2 bg-blue-200 gap-2">
            <div className="flex-none h-full">
              <Synth
                synthSettings={synthSettings}
                updateSynthSettings={updateSynthSettings}
                handleVolumeChange={handleVolumeChange}
              />
            </div>
            <div className="flex-none h-full w-[150vw] bg-lime-200">
            </div>
          </div>
          {/* keyboard */}
          <div
            className="flex row-span-3 landscape:row-span-2 h-full w-screen items-center justify-center bg-pink-500 overflow-hidden"
          >
            <button
              className="px-4 py-2 border-4 mb-6 text-lg rounded-3xl bg-slate-50 
            text-green-500 border-green-500 hover:bg-green-500 hover:text-gray-50"
              onTouchStart={playNote}
              onTouchEnd={stopNote}
              onMouseDown={playNote}
              onMouseUp={stopNote}
            >
              Play Note
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

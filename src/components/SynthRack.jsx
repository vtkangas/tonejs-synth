"use client";

import useSynth from "@/hooks/useSynth";
import Synth from "@/components/Synth";
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
        <div className="flex flex-col items-center justify-center h-screen w-screen  portrait:min-w-[375px] portrait:min-h-[667px] landscape:min-w-[667px] landscape:min-h-[375px]">
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
          <div className="flex flex-row row-span-7 landscape:row-span-8 w-screen overflow-x-auto overflow-y-hidden snap-x snap-mandatory scroll-smooth p-2 bg-blue-200 gap-2">
            <div className="scroll-ml-4 snap-start snap-always">
              <Synth
                synthSettings={synthSettings}
                updateSynthSettings={updateSynthSettings}
                handleVolumeChange={handleVolumeChange}
              />
            </div>
            <div className="scroll-ml-4 snap-start snap-always">
              <Delay delay={feedbackDelay} />
            </div>
            <div className="scroll-ml-4 snap-start">
              <Reverb reverb={reverb} />
            </div>
            <div className="scroll-ml-4 snap-start">
              <Phaser phaser={phaser} />
            </div>
            <div className="scroll-ml-4 snap-start">
              <Vibrato vibrato={vibrato} />
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

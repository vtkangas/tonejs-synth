"use client";

import Knob from "@/components/Knob";
import WaveformSelector from "@/components/WaveformSelector";
import VolumeController from "@/components/VolumeController";
import EnvelopeController from "@/components/EnvelopeController";
import FilterController from "./FilterController";

export default function Synth({ synthSettings, updateSynthSettings, volume, handleVolumeChange }) {

  return (
    <div className="inline-block landscape:inline-flex h-full w-full max-h-[390px] landscape:h-[280px] bg-emerald-200 rounded-lg border-solid border-2 border-slate-950 py-6 pl-6 pr-4">
      {/* wave and master volume */}
      <div className="flex flex-row landscape:flex-col landscape:mr-6 gap-y-2">
        <div className="flex-1 justify-start landscape:flex-none">
          <h1 className="font-semibold text-lg text-slate-950 mb-1">
            Oscillator
          </h1>
          <WaveformSelector
            synthSettings={synthSettings}
            updateSynthSettings={updateSynthSettings}
          />
        </div>
        <div className="flex flex-1 justify-end landscape:flex-none landscape:justify-start">
          <VolumeController volume={synthSettings.volume} handleVolumeChange={handleVolumeChange}/>
        </div>
      </div>

      {/* envelope and filter*/}
      <div className="flex flex-col gap-4 flex-1 bg-emerald-200">
        {/* envelope */}
        <EnvelopeController
          synthSettings={synthSettings}
          updateSynthSettings={updateSynthSettings}
        />
        {/* filter */}
        <FilterController
          synthSettings={synthSettings}
          updateSynthSettings={updateSynthSettings}
        />
      </div>
    </div>
  );
}

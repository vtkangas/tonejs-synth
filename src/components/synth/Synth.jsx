"use client";

import WaveformSelector from "@/components/synth/WaveformSelector";
import VolumeController from "@/components/synth/VolumeController";
import EnvelopeController from "@/components/synth/EnvelopeController";
import FilterController from "@/components/synth/FilterController";
import "./synth.css";

export default function Synth({
  synthSettings,
  updateSynthSettings,
  handleVolumeChange,
}) {
  return (
    <div
      className="
        flex flex-row items-center h-full w-full min-h-[230px] max-h-[260px]
        small:flex-col small:items-center small:justify-center small:min-h-[310px] small:max-h-[340px]
        large:flex-row large:items-center large:justify-center large:min-h-[230px] large:max-h-[260px]
        
        bg-[#45C4B1ff] rounded-lg  
        p-4 shadow-[3px_3px_0px_2px_rgba(2,6,23,0.5)]
      "
    >
      {/* wave and volume */}
      <div className="flex w-full flex-col small:flex-row large:flex-col items-center justify-center mr-6 small:mr-0 large:mr-6 gap-y-2 small:gap-y-4">
        <div className="flex-none small:flex-1 large:flex-none items-start justify-start min-h-12">
          <h1 className="text-slate-950 mb-1">Oscillator</h1>
          <WaveformSelector
            synthSettings={synthSettings}
            updateSynthSettings={updateSynthSettings}
          />
        </div>
        <div className="flex flex-none small:flex-1 items-start justify-end">
          <VolumeController
            volume={synthSettings.volume}
            handleVolumeChange={handleVolumeChange}
          />
        </div>
      </div>
      {/* envelope and filter */} 
      <div className="flex flex-col gap-2 small:gap-4">
        <EnvelopeController
          synthSettings={synthSettings}
          updateSynthSettings={updateSynthSettings}
        />
        <FilterController
          synthSettings={synthSettings}
          updateSynthSettings={updateSynthSettings}
        />
      </div>
    </div>
  );
}

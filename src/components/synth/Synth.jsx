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
      className="flex flex-col h-full min-h-[310px] max-h-[340px] landscape:flex-row 
        landscape:min-h-[230px] landscape:max-h-[260px] justify-evenly 
        bg-emerald-200 rounded-lg border-solid border-2 border-slate-950 
        py-4 pl-4 pr-4 shadow-[3px_3px_0px_2px_rgba(2,6,23,0.2)]"
    >
      <div className="flex flex-row landscape:flex-col landscape:mr-6 gap-y-2">
        <div className="flex-1 justify-start landscape:flex-none min-h-12">
          <h1 className="text-slate-950 mb-1">Oscillator</h1>
          <WaveformSelector
            synthSettings={synthSettings}
            updateSynthSettings={updateSynthSettings}
          />
        </div>
        <div className="flex flex-1 justify-end landscape:flex-none landscape:justify-start">
          <VolumeController
            volume={synthSettings.volume}
            handleVolumeChange={handleVolumeChange}
          />
        </div>
      </div>

      <div className="flex flex-col gap-2 flex-1 bg-emerald-200">
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

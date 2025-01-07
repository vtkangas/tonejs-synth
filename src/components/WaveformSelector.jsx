// app/components/WaveformSelector.js

import React from "react";
import Selector from "./Selector";
import { waveforms } from "../config";  // Import waveforms from the config file



export default function WaveformSelector({ synthSettings, updateSynthSettings }) {
  const handleWaveformChange = (id) => {
    console.log(id);
    updateSynthSettings({ ...synthSettings, oscillatorType: id });
  };

  return (
    <Selector
      options={waveforms}
      selectedOption={synthSettings.oscillatorType}
      onSelect={handleWaveformChange}
      buttonClassName="w-24 h-16 px-2 rounded-lg border-solid border-8 border-slate-950 
      bg-blue-800 hover:bg-blue-400 focus:outline-none z-10"
    />
  );
}

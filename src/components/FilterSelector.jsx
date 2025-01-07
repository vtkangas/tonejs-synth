// app/components/WaveformSelector.js

import React from "react";
import Selector from "./Selector";
import { filters } from "../config";  // Import waveforms from the config file



export default function FilterSelector({ synthSettings, updateSynthSettings }) {
  const handleFilterChange = (id) => {
    console.log(id);
    updateSynthSettings({ ...synthSettings, filterType: id });
  };

  return (
    <Selector
      options={filters}
      selectedOption={synthSettings.filterType}
      onSelect={handleFilterChange}
      buttonClassName="w-24 h-16 px-2 rounded-lg border-solid border-8 border-slate-950 
      bg-blue-800 hover:bg-blue-400 focus:outline-none z-10"
    />
  );
}

import Selector from "@/components/Selector";
import { waveforms } from "@/config/index";

export default function WaveformSelector({ synthSettings, updateSynthSettings }) {
  const handleWaveformChange = (id) => {
    console.log(id);
    updateSynthSettings({ oscillatorType: id });
  };

  return (
    <Selector
      options={waveforms}
      selectedOption={synthSettings.oscillatorType}
      onSelect={handleWaveformChange}
      label="Wave"
    />
  );
}

import Knob from "@/components/Knob";
import { displayValueInDecibels } from "@/utils/valueDisplayFns";

export default function VolumeController({ volume, handleVolumeChange }) {
  // Converts volume in dB (-48 to 0) to a normalized scale (0 to 1)
  const convertVolumeToNormalized = (volume) => {
    return (volume + 48) / 48; 
  };
  
  // Converts back to volume in dB (-48 to 0)
  const convertNormalizedToVolume = (normalizedValue) => {
    return normalizedValue * 48 - 48;
  };
  
  return (
    <div className="flex flex-col items-center justify-center border-dotted rounded-xl border-[#0CA789] border-4 px-4 py-2 gap-1">
      <h1 className="font-semibold text-lg text-slate-950 mb-1">Master</h1>
      <Knob
        theme="master"
        label="Volume"
        valueDefault={convertVolumeToNormalized(volume)}
        valueMin={0}
        valueMax={1}
        stepFn={(value) => 0.05}
        stepLargerFn={(value) => 0.1}
        valueRawRoundFn={(x) => x}
        valueRawDisplayFn={(value) => displayValueInDecibels(value)}
        orientation="vertical"
        onChange={(newValue) => {
          const volumeInDb = convertNormalizedToVolume(newValue);
          handleVolumeChange(volumeInDb);
        }}

      />
    </div>
  );
}

import Knob from "@/components/Knob";
import FilterSelector from "@/components/FilterSelector";
import { displayValueAsFrequencies } from "@/utils/valueDisplayFns";

export default function FilterController({
  synthSettings,
  updateSynthSettings,
}) {
  const handleKnobChange = (setting, value) => {
    console.log(`Knob Change - Setting: ${setting}, Value: ${value}`);
    updateSynthSettings({ [setting]: value });
  };
  const valueRawRoundFn = (x) => x;

  return (
    <div className="inline-block row-span-1 gap-2">
      <h1 className="font-semibold text-lg text-slate-950 mb-1">Filter</h1>
      <div className="flex flex-row gap-6 justify-start">
        <FilterSelector
          synthSettings={synthSettings}
          updateSynthSettings={updateSynthSettings}
        />
        <Knob
          theme="pink"
          label="Q"
          valueDefault={synthSettings.filterQ}
          valueMin={0}
          valueMax={10}
          stepFn={(value) => 0.05}
          stepLargerFn={(value) => 0.1}
          valueRawRoundFn={valueRawRoundFn}
          valueRawDisplayFn={(value) => value.toFixed(2)}
          orientation={"vertical"}
          onChange={(value) => handleKnobChange("filterQ", value)}
        />
        <Knob
          theme="pink"
          label="Freq"
          valueDefault={synthSettings.filterFreq}
          valueMin={20}
          valueMax={20000}
          stepFn={(value) => 0.05}
          stepLargerFn={(value) => 0.1}
          valueRawRoundFn={valueRawRoundFn}
          valueRawDisplayFn={displayValueAsFrequencies}
          orientation={"vertical"}
          onChange={(value) => handleKnobChange("filterFreq", value)}
        />
      </div>
    </div>
  );
}

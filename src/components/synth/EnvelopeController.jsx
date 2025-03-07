import Knob from "@/components/Knob";
import {
  displayValueAsPercentage,
  displayValueInSeconds,
} from "@/utils/valueDisplayFns";
import "./synth.css";

export default function EnvelopeController({
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
      <h1 className="text-slate-950 mb-1">Envelope</h1>
      <div className="flex flex-row gap-6 justify-start">
        {/* Attack */}
        <Knob
          theme="effect"
          label="Attack"
          valueDefault={synthSettings.attack}
          valueMin={0}
          valueMax={2}
          stepFn={(value) => 0.05} //keyboard input
          stepLargerFn={(value) => 0.1} //keyboard input
          valueRawRoundFn={valueRawRoundFn}
          valueRawDisplayFn={displayValueInSeconds}
          orientation={"vertical"}
          sensitivity={0.003}
          onChange={(value) => handleKnobChange("attack", value)}
        />
        {/* Decay */}
        <Knob
          theme="effect"
          label="Decay"
          valueDefault={synthSettings.decay}
          valueMin={0}
          valueMax={2}
          stepFn={(value) => 0.05}
          stepLargerFn={(value) => 0.1}
          valueRawRoundFn={valueRawRoundFn}
          valueRawDisplayFn={displayValueInSeconds}
          orientation={"vertical"}
          onChange={(value) => handleKnobChange("decay", value)}
        />
        {/* Sustain */}
        <Knob
          theme="effect"
          label="Sustain"
          valueDefault={synthSettings.sustain}
          valueMin={0}
          valueMax={1}
          stepFn={(value) => 0.05}
          stepLargerFn={(value) => 0.1}
          valueRawRoundFn={valueRawRoundFn}
          valueRawDisplayFn={displayValueAsPercentage}
          orientation={"vertical"}
          onChange={(value) => handleKnobChange("sustain", value)}
        />
        {/* Realease */}
        <Knob
          theme="effect"
          label="Release"
          valueDefault={synthSettings.release}
          valueMin={0}
          valueMax={5}
          stepFn={(value) => 0.05}
          stepLargerFn={(value) => 0.1}
          valueRawRoundFn={valueRawRoundFn}
          valueRawDisplayFn={displayValueInSeconds}
          orientation={"vertical"}
          onChange={(value) => handleKnobChange("release", value)}
        />
      </div>
    </div>
  );
}

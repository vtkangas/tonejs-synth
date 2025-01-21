import "./effects.css";
import Knob from "@/components/Knob";
import ToggleSwitch from "../ToggleSwitch";
import {
  displayValueInSeconds,
  displayValueAsPercentage,
  displayValueAsFrequencies,
} from "@/utils/valueDisplayFns";
import { useState, useEffect } from "react";

export default function Phaser({ phaser }) {
  const [freq, setFreq] = useState(15);
  const [octaves, setOctaves] = useState(5);
  const [baseFreq, setBaseFreq] = useState(1000);
  const [wet, setWet] = useState(0.5);
  const [isPhaserOn, setIsPhaserOn] = useState(false);

  const valueRawRoundFn = (x) => x;

  {
    /* handlers */
  }
  const handleFreqChange = (e) => {
    setFreq(parseFloat(e));
  };
  const handleOctavesChange = (e) => {
    setOctaves(parseFloat(e));
  };
  const handleBaseFreqChange = (e) => {
    setBaseFreq(parseFloat(e));
  };
  const handleWetChange = (e) => {
    setWet(parseFloat(e));
  };
  const togglePhaser = () => {
    setIsPhaserOn((prev) => !prev);
  };

  useEffect(() => {
    if (phaser) {
      phaser.freq = isPhaserOn ? freq : 0.0;
      phaser.octaves = isPhaserOn ? octaves : 0.0;
      phaser.baseFrequency = isPhaserOn ? baseFreq : 0.0;
      phaser.wet.value = isPhaserOn ? wet : 0.0;
    }
  }, [phaser, freq, octaves, baseFreq, wet, isPhaserOn]);

  return (
    <div className="effect-container">
      <div className="effect-top-bar">
        <ToggleSwitch checked={isPhaserOn} onChange={togglePhaser} />
        <h1 className="effect-title">Phaser</h1>
      </div>
      <div className="effect-content">
        <div className="effect-content-left">
          <div className="effect-knob">
            <Knob
              theme="pink"
              label="Freq"
              valueDefault={freq}
              valueMin={0}
              valueMax={20000}
              stepFn={(value) => 0.05}
              stepLargerFn={(value) => 0.1}
              valueRawRoundFn={valueRawRoundFn}
              valueRawDisplayFn={(value) => displayValueAsFrequencies(value)}
              orientation={"vertical"}
              onChange={(value) => handleFreqChange(value)}
              disabled={!isPhaserOn}
            />
          </div>
          <div className="effect-knob">
            <Knob
              theme="pink"
              label="Mix"
              valueDefault={wet}
              valueMin={0}
              valueMax={1}
              stepFn={(value) => 0.05}
              stepLargerFn={(value) => 0.1}
              valueRawRoundFn={valueRawRoundFn}
              valueRawDisplayFn={(value) => displayValueAsPercentage(value)}
              orientation={"vertical"}
              onChange={(value) => handleWetChange(value)}
              disabled={!isPhaserOn}
            />
          </div>
        </div>
        <div className="effect-content-right">
          <div className="effect-knob">
            <Knob
              theme="pink"
              label="Octaves"
              valueDefault={octaves}
              valueMin={0}
              valueMax={12}
              stepFn={(value) => 0.05}
              stepLargerFn={(value) => 0.1}
              valueRawRoundFn={valueRawRoundFn}
              valueRawDisplayFn={(value) => value.toFixed(0)}
              orientation={"vertical"}
              onChange={(value) => handleOctavesChange(value)}
              disabled={!isPhaserOn}
            />
          </div>
          <div className="effect-knob">
            <Knob
              theme="pink"
              label="Base Freq"
              valueDefault={baseFreq}
              valueMin={0}
              valueMax={20000}
              stepFn={(value) => 0.05}
              stepLargerFn={(value) => 0.1}
              valueRawRoundFn={valueRawRoundFn}
              valueRawDisplayFn={(value) => displayValueAsFrequencies(value)}
              orientation={"vertical"}
              onChange={(value) => handleBaseFreqChange(value)}
              disabled={!isPhaserOn}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

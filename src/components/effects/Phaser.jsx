import "./effects.css";
import Knob from "@/components/Knob";
import ToggleSwitch from "../ToggleSwitch";
import {
  displayValueAsPercentage,
  displayValueAsFrequencies,
} from "@/utils/valueDisplayFns";
import { useState, useEffect } from "react";

export default function Phaser({ phaser }) {
  const [freq, setFreq] = useState(0.5);
  const [octaves, setOctaves] = useState(3);
  const [Q, setQ] = useState(5);
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
  const handleQChange = (e) => {
    setQ(parseFloat(e));
  };
  const handleWetChange = (e) => {
    setWet(parseFloat(e));
  };
  const togglePhaser = () => {
    setIsPhaserOn((prev) => !prev);
  };

  useEffect(() => {
    if (phaser) {
      phaser.set({
        frequency: isPhaserOn ? freq : 0.0,
        octaves: isPhaserOn ? octaves : 0.0,
        Q: Q,
        wet: isPhaserOn ? wet : 0.0,
      });
    }
  }, [phaser, freq, octaves, Q, wet, isPhaserOn]);
  

  return (
    <div className="effect-container">
      <div className="effect-top-bar">
        <ToggleSwitch checked={isPhaserOn} onChange={togglePhaser} />
        <h1 className="effect-title">Phaser</h1>
      </div>
      <div className="effect-content-reversed">
        <div className="effect-content-left">
          <div className="effect-knob">
            <Knob
              theme="effect"
              label="Rate"
              valueDefault={freq}
              valueMin={0.05}
              valueMax={20}
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
              theme="sky"
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
              theme="effect"
              label="Depth"
              valueDefault={octaves}
              valueMin={0.5}
              valueMax={5}
              stepFn={(value) => 0.05}
              stepLargerFn={(value) => 0.1}
              valueRawRoundFn={valueRawRoundFn}
              valueRawDisplayFn={(value) => value.toFixed(1)}
              orientation={"vertical"}
              onChange={(value) => handleOctavesChange(value)}
              disabled={!isPhaserOn}
            />
          </div>
          <div className="effect-knob">
            <Knob
              theme="effect"
              label="Feedback"
              valueDefault={Q}
              valueMin={0.5}
              valueMax={15}
              stepFn={(value) => 0.05}
              stepLargerFn={(value) => 0.1}
              valueRawRoundFn={valueRawRoundFn}
              valueRawDisplayFn={(value) => value.toFixed(1)}
              orientation={"vertical"}
              onChange={(value) => handleQChange(value)}
              disabled={!isPhaserOn}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

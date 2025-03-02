import "./effects.css";
import Knob from "@/components/Knob";
import ToggleSwitch from "../ToggleSwitch";
import {
  displayValueAsPercentage,
  displayValueAsFrequencies,
  displayValueInSeconds,
} from "@/utils/valueDisplayFns";
import { useState, useEffect } from "react";

export default function Vibrato({ vibrato }) {
  const [maxDelay, setMaxDelay] = useState(0.005)
  const [freq, setFreq] = useState(0);
  const [depth, setDepth] = useState(0.1);
  const [wet, setWet] = useState(0);
  const [isVibratoOn, setIsVibratoOn] = useState(false);

  const valueRawRoundFn = (x) => x;

  {
    /* handlers */
  }
  const handleMaxDelayChange = (e) => {
    setMaxDelay(parseFloat(e));
  };
  const handleFreqChange = (e) => {
    setFreq(parseFloat(e));
  };
  const handleDepthChange = (e) => {
    setDepth(parseFloat(e));
  };
  const handleWetChange = (e) => {
    setWet(parseFloat(e));
  };
  const toggleVibrato = () => {
    setIsVibratoOn((prev) => !prev);
  };

  useEffect(() => {
    if (vibrato) {
      vibrato.set({
        maxDelay: isVibratoOn ? maxDelay : 0.0,
        frequency: isVibratoOn ? freq : 0.0,
        depth: isVibratoOn ? depth : 0.0,
        wet: isVibratoOn ? wet : 0.0,
      });
    }
  }, [vibrato, maxDelay, freq, depth, wet, isVibratoOn]);
  
  return (
    <div className="effect-container">
      <div className="effect-top-bar">
        <ToggleSwitch checked={isVibratoOn} onChange={toggleVibrato} />
        <h1 className="effect-title">Vibrato</h1>
      </div>
      <div className="effect-content-reversed">
        <div className="effect-content-left">
          <div className="effect-knob">
            <Knob
              theme="effect"
              label="Freq"
              valueDefault={freq}
              valueMin={0.05}
              valueMax={20}
              stepFn={(value) => 0.05}
              stepLargerFn={(value) => 0.1}
              valueRawRoundFn={valueRawRoundFn}
              valueRawDisplayFn={(value) => displayValueAsFrequencies(value)}
              orientation={"vertical"}
              onChange={(value) => handleFreqChange(value)}
              disabled={!isVibratoOn}
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
              disabled={!isVibratoOn}
            />
          </div>
        </div>
        <div className="effect-content-right">
          <div className="effect-knob">
            <Knob
              theme="effect"
              label="Depth"
              valueDefault={depth}
              valueMin={0}
              valueMax={1}
              stepFn={(value) => 0.05}
              stepLargerFn={(value) => 0.1}
              valueRawRoundFn={valueRawRoundFn}
              valueRawDisplayFn={(value) => displayValueAsPercentage(value)}
              orientation={"vertical"}
              onChange={(value) => handleDepthChange(value)}
              disabled={!isVibratoOn}
            />
          </div>
          <div className="effect-knob">
            <Knob
              theme="effect"
              label="Max Delay"
              valueDefault={maxDelay}
              valueMin={0.005}
              valueMax={0.1}
              stepFn={(value) => 0.05}
              stepLargerFn={(value) => 0.1}
              valueRawRoundFn={valueRawRoundFn}
              valueRawDisplayFn={(value) => displayValueInSeconds(value)}
              orientation={"vertical"}
              onChange={(value) => handleMaxDelayChange(value)}
              disabled={!isVibratoOn}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

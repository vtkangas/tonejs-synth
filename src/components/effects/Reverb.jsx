import "./effects.css";
import Knob from "@/components/Knob";
import ToggleSwitch from "../ToggleSwitch";
import {
  displayValueInSeconds,
  displayValueAsPercentage,
} from "@/utils/valueDisplayFns";
import { useState, useEffect } from "react";

export default function Reverb({ reverb }) {
  const [decay, setDecay] = useState(0.5);
  const [preDelay, setPreDelay] = useState(0.5);
  const [wet, setWet] = useState(0.5);
  const [isReverbOn, setIsReverbOn] = useState(true);

  const valueRawRoundFn = (x) => x;

  {
    /* handlers */
  }
  const handleDecayChange = (e) => {
    setDecay(parseFloat(e));
  };
  const handlePreDelayChange = (e) => {
    setPreDelay(parseFloat(e));
  };
  const handleWetChange = (e) => {
    setWet(parseFloat(e));
  };
  const toggleReverb = () => {
    setIsReverbOn((prev) => !prev);
  };

  useEffect(() => {
    if (reverb) {
      reverb.decay = isReverbOn ? decay : 0.001;
      reverb.preDelay = isReverbOn ? preDelay : 0;
      reverb.wet.value = isReverbOn ? wet : 0;
    }
  }, [reverb, decay, preDelay, wet, isReverbOn]);

  return (
    <div className="effect-container">
      <div className="effect-top-bar">
        <ToggleSwitch checked={isReverbOn} onChange={toggleReverb} />
        <h1 className="effect-title">Reverb</h1>
      </div>
      <div className="effect-content">
        <div className="effect-content-left">
          <div className="effect-knob">
            <Knob
              theme="pink"
              label="Decay"
              valueDefault={decay}
              valueMin={0.1}
              valueMax={5}
              stepFn={(value) => 0.05}
              stepLargerFn={(value) => 0.1}
              valueRawRoundFn={valueRawRoundFn}
              valueRawDisplayFn={(value) => displayValueInSeconds(value)}
              orientation={"vertical"}
              onChange={(value) => handleDecayChange(value)}
              disabled={!isReverbOn}
            />
          </div>
        </div>
        <div className="effect-content-right">
          <div className="effect-knob">
            <Knob
              theme="pink"
              label="Pre-Delay"
              valueDefault={preDelay}
              valueMin={0}
              valueMax={0.25}
              stepFn={(value) => 0.05}
              stepLargerFn={(value) => 0.1}
              valueRawRoundFn={valueRawRoundFn}
              valueRawDisplayFn={(value) => displayValueInSeconds(value)}
              orientation={"vertical"}
              onChange={(value) => handlePreDelayChange(value)}
              disabled={!isReverbOn}
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
              disabled={!isReverbOn}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

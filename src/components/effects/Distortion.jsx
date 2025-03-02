import "./effects.css";
import Knob from "@/components/Knob";
import ToggleSwitch from "../ToggleSwitch";
import {
  displayValueInSeconds,
  displayValueAsPercentage,
} from "@/utils/valueDisplayFns";
import { useState, useEffect } from "react";

export default function Distortion({ distortion }) {
  const [distortionAmount, setDistortionAmount] = useState(0.1);
  const [oversample, setOversample] = useState("none");
  const [wet, setWet] = useState(0.5);
  const [isDistortionOn, setIsDistortionOn] = useState(false);

  const valueRawRoundFn = (x) => x;

  {
    /* handlers */
  }
  const handleDistortionAmountChange = (e) => {
    setDistortionAmount(parseFloat(e));
  };
  const handleOversampleChange = (event) => {
    const value = event.target.value;
    setOversample(value);
    distortion.oversample = value; // Update Tone.js effect
  };
  const handleWetChange = (e) => {
    setWet(parseFloat(e));
  };
  const toggleDistortion = () => {
    setIsDistortionOn((prev) => !prev);
  };

  useEffect(() => {
    if (distortion) {
      distortion.distortion = isDistortionOn ? distortionAmount : 0.0;
      distortion.oversample = isDistortionOn ? oversample : "none";
      distortion.wet.value = isDistortionOn ? wet : 0.0;

      console.log("Distortion Oversample set to:", distortion.oversample);
    }
  }, [distortion, distortionAmount, oversample, wet, isDistortionOn]);

  return (
    <div className="effect-container">
      <div className="effect-top-bar">
        <ToggleSwitch
          checked={isDistortionOn}
          onChange={(value) => toggleDistortion(value)}
        />
        <h1 className="effect-title">Distortion</h1>
      </div>
      <div className="effect-content">
        <div className="effect-content-right">
          <div className="effect-knob">
            <Knob
              theme="effect"
              label="Distortion"
              valueDefault={distortionAmount}
              valueMin={0}
              valueMax={1}
              stepFn={(value) => 0.05}
              stepLargerFn={(value) => 0.1}
              valueRawRoundFn={valueRawRoundFn}
              valueRawDisplayFn={(value) => displayValueAsPercentage(value)}
              orientation={"vertical"}
              onChange={(value) => handleDistortionAmountChange(value)}
              disabled={!isDistortionOn}
            />
          </div>
          <div className="effect-knob">
            <Knob
              theme="indian-red"
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
              disabled={!isDistortionOn}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

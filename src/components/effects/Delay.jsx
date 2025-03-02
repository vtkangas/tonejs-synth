import "./effects.css";
import Knob from "@/components/Knob";
import ToggleSwitch from "../ToggleSwitch";
import {
  displayValueInSeconds,
  displayValueAsPercentage,
} from "@/utils/valueDisplayFns";
import { useState, useEffect } from "react";

export default function Delay({ delay }) {
  const [delayTime, setDelayTime] = useState(0.5);
  const [feedback, setFeedback] = useState(0.5); 
  const [wet, setWet] = useState(0.5); 
  const [isDelayOn, setIsDelayOn] = useState(false); 

  const valueRawRoundFn = (x) => x;

  { /* handlers */ }
  const handleDelayTimeChange = (e) => {
    setDelayTime(parseFloat(e));
  };
  const handleFeedbackChange = (e) => {
    setFeedback(parseFloat(e));
  };
  const handleWetChange = (e) => {
    setWet(parseFloat(e));
  };
  const toggleDelay = () => {
    setIsDelayOn((prev) => !prev);
  };

  useEffect(() => {
    if (delay) {
      delay.delayTime.value = isDelayOn ? delayTime : 0.0;
      delay.feedback.value = isDelayOn ? feedback : 0.0;
      delay.wet.value = isDelayOn ? wet : 0.0; // Set wet to 0 if delay is off
    }
  }, [delay, delayTime, feedback, wet, isDelayOn]);

  return (
    <div className="effect-container">
      <div className="effect-top-bar">
        <ToggleSwitch checked={isDelayOn} onChange={toggleDelay} />
        <h1 className="effect-title">Delay</h1>
      </div>
      <div className="effect-content">
        <div className="effect-content-left">
          <div className="effect-knob">
            <Knob
              theme="effect"
              label="Feedback"
              valueDefault={feedback}
              valueMin={0}
              valueMax={1}
              stepFn={(value) => 0.05}
              stepLargerFn={(value) => 0.1}
              valueRawRoundFn={valueRawRoundFn}
              valueRawDisplayFn={(value) => displayValueAsPercentage(value)}
              orientation={"vertical"}
              onChange={(value) => handleFeedbackChange(value)}
              disabled={!isDelayOn}
            />
          </div>
        </div>
        <div className="effect-content-right">
          <div className="effect-knob">
            <Knob
              theme="effect"
              label="Time"
              valueDefault={delayTime}
              valueMin={0}
              valueMax={1}
              stepFn={(value) => 0.05}
              stepLargerFn={(value) => 0.1}
              valueRawRoundFn={valueRawRoundFn}
              valueRawDisplayFn={(value) => displayValueInSeconds(value)}
              orientation={"vertical"}
              onChange={(value) => handleDelayTimeChange(value)}
              disabled={!isDelayOn}
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
              disabled={!isDelayOn}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

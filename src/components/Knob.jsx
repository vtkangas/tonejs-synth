"use client";

import React, { useState, useId } from "react";
import {
  KnobHeadless,
  KnobHeadlessLabel,
  KnobHeadlessOutput,
} from "react-knob-headless";
import { mapFrom01Linear, mapTo01Linear } from "@dsp-ts/math";
import { KnobBaseThumb } from "@/components/KnobBaseThumb";

export default function Knob({
  theme,
  label,
  valueDefault,
  valueMin,
  valueMax,
  valueRawRoundFn,
  valueRawDisplayFn,
  orientation,
  stepFn,
  stepLargerFn,
  mapTo01 = mapTo01Linear,
  mapFrom01 = mapFrom01Linear,
}) {
  const [isHovered, setIsHovered] = useState(false);
  const knobId = useId();
  const labelId = useId();
  const [valueRaw, setValueRaw] = useState(valueDefault);
  const value01 = mapTo01(valueRaw, valueMin, valueMax);
  const step = stepFn(valueRaw); //for keyboard usage!!
  const stepLarger = stepLargerFn(valueRaw); //for keyboard usage!!
  const dragSensitivity = 0.006;

  const handleTouchStart = () => {
    setIsHovered(true);
  };

  const handleTouchEnd = () => {
    setIsHovered(false);
  };

  return (
    <>
      <div className="relative">
        {/* shadow */}
        <div className="absolute w-16 h-16 bg-gray-400 rounded-full translate-x-1 translate-y-1"></div>

        {/* parameter value display */}
        <div
          className={`absolute left-1/2 transform -translate-x-1/2 text-black bg-sky-200 px-2 
            border-4 border-solid border-black rounded-md font-bold transition-all duration-300 z-10 ${
            isHovered
              ? "opacity-100 translate-y-[-72px] scale-100"
              : "opacity-0 translate-y-0 scale-50"
          }`}
        >
          <KnobHeadlessOutput htmlFor={knobId}>
            {valueRawDisplayFn(valueRaw)}
          </KnobHeadlessOutput>
        </div>

        <KnobHeadless
          id={knobId}
          aria-labelledby={labelId}
          className={`relative w-16 h-16 outline-none transition-transform duration-300 ${
            isHovered ? "scale-[2] z-50" : "z-10"
          }`}
          onMouseEnter={() => setIsHovered(true)} 
          onMouseLeave={() => setIsHovered(false)} 
          onTouchStart={handleTouchStart} 
          valueMin={valueMin}
          valueMax={valueMax}
          valueRaw={valueRaw}
          onValueRawChange={setValueRaw}
          valueRawRoundFn={(value) => Math.round(value * 100) / 100}
          valueRawDisplayFn={(value) => `${(value * 100).toFixed(0)}%`}
          dragSensitivity={dragSensitivity}
          orientation={orientation}
          mapTo01={(value) => value} // Map value to 0-1
          mapFrom01={(value) => value} // Reverse map
        >
          <KnobBaseThumb theme={theme} value01={value01} />
        </KnobHeadless>
      </div>
      <KnobHeadlessLabel className="mt-2 text-center" id={labelId}>
        {label}
      </KnobHeadlessLabel>
    </>
  );
}

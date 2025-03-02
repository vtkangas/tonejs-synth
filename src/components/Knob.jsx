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
  onChange,
  disabled = false,
  sensitivity
}) {
  const [isHovered, setIsHovered] = useState(false);
  const knobId = useId();
  const labelId = useId();
  const [valueRaw, setValueRaw] = useState(valueDefault);
  const step = stepFn(valueRaw);
  const stepLarger = stepLargerFn(valueRaw);
  const dragSensitivity = sensitivity || 0.006;

  // mapping raw value to 0-1 scale and back to actual range
  const value01 = mapTo01(valueRaw, valueMin, valueMax); // Normalize to 0-1 range
  const valueMapped = mapFrom01(value01, valueMin, valueMax); // Map back to actual range

  const handleTouchStart = () => {
    if (!disabled) setIsHovered(true);
  };

  const handleTouchEnd = () => {
    if (!disabled) setIsHovered(false);
  };

  const handleValueChange = (newValue) => {
    if (!disabled) {setValueRaw(newValue);
    if (onChange) {
      onChange(newValue);
    }}
  };

  return (
    <div
      className={`relative w-11 justify-items-center align-middle z-10 ${
        disabled ? "opacity-50 cursor-not-allowed" : ""
      }`}
      style={{
        touchAction: 'none', // Prevent default touch actions on mobile
        userSelect: 'none',  // Prevent text selection on mobile
        WebkitUserSelect: 'none', // Prevent text selection on mobile for Webkit-based browsers
      }}
    >

      {/* Value display */}
      <div
        className={`absolute left-1/2 transform -translate-x-1/2 transition-all duration-300 
            ${
              (isHovered && !disabled)
                ? "top-[-55px] opacity-100 scale-100"
                : "opacity-0 scale-50 top-0"
            }
            whitespace-nowrap text-black bg-sky-200 px-2 
            border-2 border-solid border-black rounded-md shadow-md font-bold z-10`}
      >
        <KnobHeadlessOutput htmlFor={knobId}>
          {valueRawDisplayFn(valueMapped)}
        </KnobHeadlessOutput>
      </div>
      {/* Value display ends*/}

      <div className="relative flex flex-col items-center">
        {/* Shadow */}
        <div className="absolute w-9 h-9 bg-slate-950/40 rounded-full translate-x-1 translate-y-1"></div>

        {/* Knob */}
        <KnobHeadless
          id={knobId}
          aria-labelledby={labelId}
          className={`relative w-9 h-9 outline-none transition-transform duration-300 ${
            isHovered && !disabled ? "scale-[2] z-50" : "z-10"
          }`}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
          valueMin={valueMin}
          valueMax={valueMax}
          valueRaw={valueMapped} // Use the mapped value
          onValueRawChange={handleValueChange}
          valueRawRoundFn={valueRawRoundFn}
          valueRawDisplayFn={valueRawDisplayFn}
          dragSensitivity={dragSensitivity}
          orientation={orientation}
          mapTo01={(value) => mapTo01(value, valueMin, valueMax)} // Map value to 0-1
          mapFrom01={(value) => mapFrom01(value, valueMin, valueMax)} // Reverse map back to range
        >
          <KnobBaseThumb theme={theme} value01={value01} />
        </KnobHeadless>
        <KnobHeadlessLabel
          id={labelId}
          className="text-sm mt-[2px] whitespace-nowrap"
        >
          {label}
        </KnobHeadlessLabel>
      </div>
    </div>
  );
}

export const displayValueAsPercentage = (value) => {
  return `${(value * 100).toFixed(0)}%`;
}

export const displayValueInSeconds = (value) => {
  if (value < 1) {
    return `${(value * 1000).toFixed(0)}ms`;
  }

  return `${value.toFixed(2)}s`; 
};

export const displayValueAsFrequencies = (hz) => {
  if (hz < 100) {
    return `${hz.toFixed(1)} Hz`;
  }

  if (hz < 1000) {
    return `${hz.toFixed(0)} Hz`;
  }

  const kHz = hz / 1000;

  if (hz < 10000) {
    return `${kHz.toFixed(2)} kHz`;
  }

  return `${kHz.toFixed(1)} kHz`;
};

// Converts 0-1 to -48 to 0 dB
export const displayValueInDecibels = (value) => {
  return `${(value * 48 - 48).toFixed(0)} dB`; 
};
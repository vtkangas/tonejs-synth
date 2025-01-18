import { useEffect, useRef, useState } from "react";
import * as Tone from "tone";

const useSynth = () => {
  const [audioSupported, setAudioSupported] = useState(null);
  const [audioStarted, setAudioStarted] = useState(false);
  const synthRef = useRef(null);
  const [synthSettings, setSynthSettings] = useState({
    oscillatorType: "sine",
    attack: 0.1,
    decay: 0.3,
    sustain: 0.5,
    release: 0.3,
    filterType: "lowpass",
    filterFreq: 200,
    filterQ: 1,
    volume: -12,
  });

  // C h e c k  T o n e . j s  s u p p o r t
  useEffect(() => {
    console.log("Checking audio support...");
    const supportsAudio =
      typeof AudioContext !== "undefined" ||
      typeof webkitAudioContext !== "undefined";

    setAudioSupported(supportsAudio);
    console.log(
      supportsAudio ? "AudioContext is supported" : "AudioContext not supported"
    );
  }, []);

  // c r e a t e  s y n t h
  useEffect(() => {
    if (audioStarted) {
      synthRef.current = new Tone.PolySynth(Tone.MonoSynth, {
        oscillator: { type: synthSettings.oscillatorType },
        envelope: {
          attack: synthSettings.attack,
          decay: synthSettings.decay,
          sustain: synthSettings.sustain,
          release: synthSettings.release,
        },
        filter: {
          type: synthSettings.filterType,
          rolloff: -12,
          Q: synthSettings.filterQ,
        },
        filterEnvelope: {
          attack: 0.1,
          baseFrequency: synthSettings.filterFreq,
          },          
      }).toDestination();

      Tone.getDestination().volume.value = synthSettings.volume;

      return () => {
        synthRef.current.dispose();
      };
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [audioStarted]);

  // s t a r t  a u d i o  c o n t e x t
  const startAudio = async () => {
    const context = Tone.getContext();
    if (context.state !== "running" || !audioStarted) {
      try {
        await Tone.start();
        setAudioStarted(true);
        console.log("Audio Context Started");
      } catch (error) {
        console.error("Error starting audio context:", error);
      }
    }
  };

  const playNote = () => {
    try {
      if (synthRef.current && audioStarted) {
        synthRef.current.triggerAttack("C4");
        console.log("Note C4 is playing");
      } else {
        console.warn(
          "Synth is not initialized or audio context has not started"
        );
      }
    } catch (error) {
      console.error("Error playing note:", error);
    }
  };

  const stopNote = () => {
    try {
      if (synthRef.current && audioStarted) {
        synthRef.current.triggerRelease("C4");
        console.log("Note C4 is stopped");
      } else {
        console.warn(
          "Synth is not initialized or audio context has not started"
        );
      }
    } catch (error) {
      console.error("Error stopping note:", error);
    }
  };

  const updateSynthSettings = (newSettings) => {
    console.log("Updating synth settings:", newSettings);
    setSynthSettings((prev) => {
      const updatedSettings = { ...prev, ...newSettings };
  
      if (synthRef.current) {
        // Apply only the updated parameters
        Object.keys(newSettings).forEach((key) => {
          if (key === "oscillatorType") {
            synthRef.current.set({
              oscillator: { type: updatedSettings.oscillatorType },
            });
          } else if (["attack", "decay", "sustain", "release"].includes(key)) {
            synthRef.current.set({
              envelope: {
                [key]: updatedSettings[key],
              },
            });
          } else if (["filterType", "filterFreq", "filterQ"].includes(key)) {
            synthRef.current.set({
              filter: {
                type: updatedSettings.filterType,
                Q: updatedSettings.filterQ,
              },
              filterEnvelope: {
                baseFrequency: synthSettings.filterFreq,
              },   
            });
          }
        });
      }
      console.log(" settings:", synthRef.current);

      return updatedSettings;
    });
  };

  const handleVolumeChange = (newVolume) => {
    setSynthSettings((prevSettings) => {
      const updatedSettings = { ...prevSettings, volume: newVolume };
      if (synthRef.current) {
        synthRef.current.volume.value = newVolume; 
      }
      return updatedSettings;
    });
  };
  
  return {
    audioSupported,
    audioStarted,
    synthRef,
    synthSettings,
    startAudio,
    playNote,
    stopNote,
    updateSynthSettings,
    handleVolumeChange,
  };
};

export default useSynth;

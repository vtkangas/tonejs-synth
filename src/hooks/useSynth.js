import { useEffect, useRef, useState } from "react";
import * as Tone from "tone";

const useSynth = () => {
  const [audioSupported, setAudioSupported] = useState(null);
  const [audioStarted, setAudioStarted] = useState(false);
  const synthRef = useRef(null);
  const [synthSettings, setSynthSettings] = useState({
    oscillatorType: "sine",
    attack: 0.005,
    decay: 0.1,
    sustain: 0.9,
    release: 1,
    filterType: "lowpass",
    filterFreq: 200,
    filterQ: 1,
    volume: -12,
  });
  const [feedbackDelay, setFeedbackDelay] = useState(null);
  const [reverb, setReverb] = useState(null);
  const [phaser, setPhaser] = useState(null);
  const [vibrato, setVibrato] = useState(null);
  const [distortion, setDistortion] = useState(null);


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
    let newDelay;
    let newReverb;
    let newPhaser;
    let newVibrato;
    let newDistortion;

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
          attack: 0.6,
          baseFrequency: synthSettings.filterFreq,
          decay: 0.2,
          exponent: 2,
          octaves: 3,
          release: 2,
          sustain: 0.5,
        },
      }).toDestination();

      newDelay = new Tone.FeedbackDelay({
        delayTime: 0.5,
        feedback: 0.5,
        wet: 0.5,
      });
      setFeedbackDelay(newDelay);

      newReverb = new Tone.Reverb({
        decay: 1.5,
        preDelay: 0.2,
        wet: 0.5,
      });
      setReverb(newReverb);

      newPhaser = new Tone.Phaser({
        frequency: 0.5,
        octaves: 3,
        stages: 8,
        Q: 5,
        baseFrequency: 350,
        wet: 0.5,
      });
      setPhaser(newPhaser);

      newVibrato = new Tone.Vibrato({
        maxDelay: 0.005, 
        frequency : 0,
        depth : 0.1,
      });
      setVibrato(newVibrato);

      newDistortion = new Tone.Distortion({
        distortion: 0.1,
        oversample: "2x",
        wet: 0.5,
      })
      setDistortion(newDistortion);

      synthRef.current.chain(
        newDistortion,
        newPhaser,
        newVibrato,
        newDelay,
        newReverb,
        Tone.getDestination()
      );
      Tone.getDestination().volume.value = synthSettings.volume;

      return () => {
        synthRef.current.dispose();
        newDelay.dispose();
        newReverb.dispose();
        newPhaser.dispose();
        newVibrato.dispose();
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

  const playNote = (key) => {
    try {
      if (synthRef.current && audioStarted) {
        synthRef.current.triggerAttack(key);
        console.log(`Note ${key} is playing`);
      } else {
        console.warn(
          "Synth is not initialized or audio context has not started"
        );
      }
    } catch (error) {
      console.error("Error playing note:", error);
    }
  };

  const stopNote = (key) => {
    try {
      if (synthRef.current && audioStarted) {
        synthRef.current.triggerRelease(key);
        console.log(`Note ${key} is stopped`);
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
    feedbackDelay,
    reverb,
    phaser,
    vibrato,
    distortion
  };
};

export default useSynth;

import { useRef, useState } from "react";

export default function Keyboard({ playNote, stopNote }) {
  
  // List of all the keys (C, C#, D, D#, E, F, F#, G, G#, A, A#, B)
  const pianoKeys = [
    "C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B",
  ];

  // Function to generate notes for the 0-6 octaves
  function generateNotes() {
    const notes = [];
    for (let octave = 0; octave <= 6; octave++) {
      for (const key of pianoKeys) {
        notes.push(`${key}${octave}`); 
      }
    }
    return notes;
  }
  const allNotes = generateNotes();

  const [activeKeys, setActiveKeys] = useState(new Set());

  const handlePointerDown = (note) => {
    setActiveKeys(prev => new Set(prev).add(note)); 
    playNote(note);  
  };

  const handlePointerUp = (note) => {
    setActiveKeys(prev => {
      const updated = new Set(prev);
      updated.delete(note);  
      return updated;
    });
    stopNote(note); 
  };

  const handlePointerLeave = (note) => {
    setActiveKeys(prev => {
      const updated = new Set(prev);
      updated.delete(note); 
      return updated;
    });
    stopNote(note);  
  };

  return (
    <div
      className="flex flex-shrink-0 h-full w-fit items-center justify-center bg-slate-400 pt-4 z-50"
      style={{
        userSelect: "none", 
        WebkitUserSelect: "none", 
        MozUserSelect: "none",
        msUserSelect: "none", 
      }}
    >
      <div
        className="relative flex w-full h-full bg-orange-300"
        style={{ touchAction: "none" }}
      >
        {allNotes.map((note) => {
          const isBlackKey = note.includes("#"); 
          const isActive = activeKeys.has(note); 

          return (
            <div key={note} className="relative flex">
              {/* White Key */}
              {!isBlackKey && (
                <button
                  className={`min-w-[54px] h-full relative border border-gray-700 transition-all ${
                    isActive ? "bg-red-400" : "bg-white"
                  }`}
                  onPointerDown={() => handlePointerDown(note)}
                  onPointerLeave={() => handlePointerLeave(note)}
                  onPointerCancel={() => handlePointerLeave(note)}
                  onPointerUp={() => handlePointerUp(note)}
                >
                  <span
                    className={`bottom-1/3 left-1/2 transform -translate-x-1/3 text-slate-950 text-xs`}
                  >
                    {note}
                  </span>
                </button>
              )}

              {/* Black Key */}
              {isBlackKey && (
                <button
                  className={`absolute min-w-[52px] h-1/2 z-10 ${
                    isActive ? "bg-red-400" : "bg-slate-950"
                  }`}
                  style={{
                    left: "calc(100% - 26px)", 
                  }}
                  onPointerDown={() => handlePointerDown(note)}
                  onPointerLeave={() => handlePointerLeave(note)}
                  onPointerCancel={() => handlePointerLeave(note)}
                  onPointerUp={() => handlePointerUp(note)}
                >
                  <span className="text-white text-xs absolute bottom-0 left-1/2 transform -translate-x-1/2">
                    {note}
                  </span>
                </button>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

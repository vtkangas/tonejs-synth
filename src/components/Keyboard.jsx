import { useRef, useState } from "react";
import CustomScroller from "@/components/CustomScroller";

export default function Keyboard({ playNote, stopNote }) {
  const pianoKeys = [
    "C",
    "C#",
    "D",
    "D#",
    "E",
    "F",
    "F#",
    "G",
    "G#",
    "A",
    "A#",
    "B",
  ];

  // generate notes for the 0-6 octaves
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
    setActiveKeys((prev) => new Set(prev).add(note));
    playNote(note);
  };

  const handlePointerUp = (note) => {
    setActiveKeys((prev) => {
      const updated = new Set(prev);
      updated.delete(note);
      return updated;
    });
    stopNote(note);
  };

  return (
    <CustomScroller>
      {allNotes.map((note) => {
        const isBlackKey = note.includes("#");
        const isActive = activeKeys.has(note);

        return (
          <div key={note} className="relative flex">
            {!isBlackKey && (
              <button
                className={`flex min-w-[54px] h-full relative border border-gray-700 transition-all ${
                  isActive ? "bg-red-400" : "bg-white"
                }`}
                onPointerDown={() => handlePointerDown(note)}
                onPointerLeave={() => handlePointerUp(note)}
                onPointerCancel={() => handlePointerUp(note)}
                onPointerUp={() => handlePointerUp(note)}
              >
                <span className={`text-slate-950 text-xs absolute bottom-[2px] left-1/2 transform -translate-x-1/2`}>{note}</span>
              </button>
            )}

            {isBlackKey && (
              <button
                className={`absolute min-w-[60px] h-1/2 z-10 border-solid border-x-[1px] border-white ${
                  isActive ? "bg-red-400" : "bg-slate-950"
                }`}
                style={{
                  left: "calc(100% - 26px)",
                }}
                onPointerDown={() => handlePointerDown(note)}
                onPointerLeave={() => handlePointerUp(note)}
                onPointerCancel={() => handlePointerUp(note)}
                onPointerUp={() => handlePointerUp(note)}
              >
                <span className="text-white text-xs absolute bottom-[2px] left-1/2 transform -translate-x-1/2">
                  {note}
                </span>
              </button>
            )}
          </div>
        );
      })}
    </CustomScroller>
  );
}

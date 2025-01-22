import { useRef } from "react";

export default function Keyboard({ playNote, stopNote }) {
  const keyboardRef = useRef(null);
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

  function generateNotes() {
    const notes = [];
    for (let octave = 0; octave <= 6; octave++) {
      for (const key of pianoKeys) {
        notes.push(`${key}${octave}`); // Combine each key with the current octave
      }
    }
    return notes;
  }

  const allNotes = generateNotes();
  console.log(allNotes);

  return (
    <div className="flex flex-shrink-0 h-full w-fit items-center justify-center bg-slate-400 pt-4">
      <div
        className="relative flex w-full h-full bg-orange-300 "
        style={{
          touchAction: "none", // Prevent default touch actions on mobile (e.g., scrolling or selecting text)
          userSelect: "none", // Prevent text selection on mobile
          WebkitUserSelect: "none", // Prevent text selection on mobile for Webkit-based browsers
        }}
      >
        {allNotes.map((note, index) => {
          const isBlackKey = note.includes("#");

          return (
            <div key={note} className="relative flex">
              {/* White key */}
              {!isBlackKey && (
                <button
                  key={note}
                  className={`min-w-[54px] ${
                    note.includes("#") ? "bg-slate-950" : "bg-white"
                  } h-full relative border border-gray-700 active:bg-red-400 transition-all`}
                  onTouchStart={() => playNote(note)}
                  onTouchEnd={() => stopNote(note)}
                  onMouseDown={() => playNote(note)}
                  onMouseUp={() => stopNote(note)}
                >
                  <span
                    className={`bottom-1/3 left-1/2 transform -translate-x-1/3 ${
                      note.includes("#") ? "text-white" : "text-slate-950"
                    } text-xs`}
                  >
                    {note}
                  </span>
                </button>
              )}

              {/* Black key */}
              {isBlackKey && (
                <button
                  className="absolute flex-1 bg-slate-950 min-w-[52px] h-1/2 z-10"
                  style={{
                    left: "calc(100% - 26px)", // Correct black key positioning
                  }}
                  onTouchStart={() => playNote(note)}
                  onTouchEnd={() => stopNote(note)}
                  onMouseDown={() => playNote(note)}
                  onMouseUp={() => stopNote(note)}
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

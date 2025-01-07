import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";

export default function Selector({
  options,
  selectedOption,
  onSelect,
  buttonClassName,
}) {
  const [isOpen, setIsOpen] = useState(false);
  const wrapperRef = useRef(null);

  // Handle clicks outside the component to close the dropdown
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative inline-flex" ref={wrapperRef}>
      {/* shadow */}
      <div className="absolute w-24 h-16 px-2 rounded-lg bg-gray-400 translate-x-1 translate-y-1"></div>

      {/* Button that toggles the dropdown menu */}
      <button
        className={`inline-flex items-center justify-center transition-transform ${buttonClassName} ${
          isOpen ? "translate-x-1 translate-y-1" : ""
        }`}
        onClick={() => setIsOpen((prev) => !prev)}
        aria-expanded={isOpen}
      >
        <Image
          src={options.find((option) => option.id === selectedOption).src}
          alt={selectedOption}
          className="w-16 h-8"
          width={96}
          height={64}
        />
      </button>
      {!isOpen ? (
        <></>
      ) : (
        <>
          {/* Dropdown Menu */}
          <ul
            className={`absolute left-full top-0 w-24 flex-col bg-slate-600 border border-slate-400 rounded shadow-md 
            transition-all transform z-50 ${
              isOpen
                ? "opacity-100 translate-x-1"
                : "opacity-0 translate-x-[-1rem]"
            }`}
          >
            {options.map((option) => (
              <li key={option.id}>
                <button
                  className={`flex items-center justify-center p-2 w-full ${
                    option.id === selectedOption
                      ? "bg-blue-800"
                      : "hover:bg-blue-400"
                  }`}
                  onClick={() => {
                    onSelect(option.id);
                    setIsOpen(false); // Close the dropdown after selection
                  }}
                >
                  <Image
                    src={option.src}
                    alt={option.id}
                    className="w-20 h-12"
                    width={96}
                    height={64}
                  />
                </button>
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
}

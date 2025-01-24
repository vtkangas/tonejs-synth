import { useState, useEffect, useRef } from "react";
import Image from "next/image";

export default function Selector({ options, selectedOption, onSelect, label }) {
  const [isOpen, setIsOpen] = useState(false);
  const wrapperRef = useRef(null);

  // Handle events outside the component to close the dropdown
  useEffect(() => {
    const handleOutsideEvent = (event) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    const handleScroll = () => {
      setIsOpen(false); // Close dropdown when scrolling
    };

    document.addEventListener("mousedown", handleOutsideEvent);
    document.addEventListener("touchstart", handleOutsideEvent);
    document.addEventListener("focusin", handleOutsideEvent);
    document.addEventListener("scroll", handleScroll, true);

    return () => {
      document.removeEventListener("mousedown", handleOutsideEvent);
      document.removeEventListener("touchstart", handleOutsideEvent);
      document.removeEventListener("focusin", handleOutsideEvent);
      document.removeEventListener("scroll", handleScroll, true);
    };
  }, []);

  return (
    <div
      className="relative inline-flex flex-col items-center"
      ref={wrapperRef}
    >
      {/* shadow */}
      <div className="absolute w-[68px] h-9 rounded-lg bg-gray-400 translate-x-1 translate-y-1"></div>

      <button
        className={`inline-flex w-[68px] h-9 p-[12px] items-center justify-center transition-transform rounded-lg border-solid border-[5px] border-slate-950 
      bg-blue-800 hover:bg-blue-400 focus:outline-none z-10 ${
        isOpen ? "translate-x-1 translate-y-1 bg-blue-400 border-blue-800" : ""
      }`}
        onClick={() => setIsOpen((prev) => !prev)}
        aria-expanded={isOpen}
      >
        <Image
          src={options.find((option) => option.id === selectedOption).src}
          alt={selectedOption}
          width={96}
          height={64}
        />
      </button>
      <p className="text-sm mt-[2px]">{label}</p>
      <ul
        className={`fixed w-24 bg-slate-600 border border-slate-400 rounded shadow-md 
        transition-all duration-300 z-50 ${
          isOpen
            ? "opacity-100 translate-x-[84px] pointer-events-auto"
            : "opacity-0 translate-x-16 pointer-events-none"
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
                setIsOpen(false);
              }}
            >
              <Image
                src={option.src}
                alt={option.id}
                className="w-16 h-8"
                width={96}
                height={64}
              />
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

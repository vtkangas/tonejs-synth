import "./customScroller.css";
import { useEffect, useRef, useState } from "react";

export default function CustomScroller({ children }) {
  const scrollableRef = useRef(null);
  const scrollbarRef = useRef(null);
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    const scrollable = scrollableRef.current;
    const customScrollbar = scrollbarRef.current;

    const handleScroll = () => {
      const scrollLeft = scrollable.scrollLeft;
      const scrollWidth = scrollable.scrollWidth;
      const clientWidth = scrollable.clientWidth;

      const scrollbarWidth = (clientWidth / scrollWidth) * clientWidth;
      customScrollbar.style.width = `${scrollbarWidth}px`;

      const scrollPercentage = scrollLeft / (scrollWidth - clientWidth);
      customScrollbar.style.left = `${
        scrollPercentage * (clientWidth - scrollbarWidth)
      }px`;
    };

    const handleResize = () => {
      handleScroll();
    };

    const handleDrag = (e) => {
      e.preventDefault();

      const customScrollbarWidth = customScrollbar.offsetWidth;
      const scrollableWidth = scrollable.scrollWidth;
      const clientWidth = scrollable.clientWidth;

      let prevX = e.clientX || e.touches?.[0]?.clientX;

      const onMouseMove = (moveEvent) => {
        const currentX = moveEvent.clientX || moveEvent.touches?.[0]?.clientX;
        const deltaX = currentX - prevX;

        prevX = currentX;

        const newLeft = Math.min(
          Math.max(0, customScrollbar.offsetLeft + deltaX),
          clientWidth - customScrollbarWidth
        );

        customScrollbar.style.left = `${newLeft}px`;

        const scrollPercentage = newLeft / (clientWidth - customScrollbarWidth);
        scrollable.scrollLeft =
          scrollPercentage * (scrollableWidth - clientWidth);
      };

      const onMouseUp = () => {
        window.removeEventListener("mousemove", onMouseMove);
        window.removeEventListener("mouseup", onMouseUp);
        window.removeEventListener("touchmove", onMouseMove);
        window.removeEventListener("touchend", onMouseUp);
      };

      window.addEventListener("mousemove", onMouseMove);
      window.addEventListener("mouseup", onMouseUp);
      window.addEventListener("touchmove", onMouseMove);
      window.addEventListener("touchend", onMouseUp);
    };

    scrollable.addEventListener("scroll", handleScroll, { passive: true });
    customScrollbar.addEventListener("mousedown", handleDrag, { passive: false });
    customScrollbar.addEventListener("touchstart", handleDrag, { passive: false });
    window.addEventListener("resize", handleResize, { passive: true });

    handleScroll();

    return () => {
      scrollable.removeEventListener("scroll", handleScroll);
      customScrollbar.removeEventListener("mousedown", handleDrag);
      customScrollbar.removeEventListener("touchstart", handleDrag);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <>
      {/* Overlay for expanded state */}
      {expanded && (
        <div
          onClick={() => setExpanded(false)}
          className="fixed inset-0 bg-black bg-opacity-50 z-10"
        ></div>
      )}

      <div
        className={`bottom-0 left-0 w-full pl-2 pr-8 z-20 bg-pink-500 transition-all duration-300 ease-in-out ${
          expanded
            ? "absolute bottom-0 left-0 h-[60vh] shadow-[0_-2px_8px_rgba(0,0,0,0.3)]"
            : "relative shadow-none"
        }`}
      >
        {/* shadow */}
        <div className="absolute top-[2px] right-[6px] w-[24px] h-[24px] rounded-md bg-gray-400 translate-x-1 translate-y-1 small:hidden"></div>

        {/* Toggle Button */}
        <button
          onClick={() => setExpanded((prev) => !prev)}
          className={`absolute top-[2px] right-[6px] z-30 text-white px-[6px] py-[6px] rounded-md shadow-md 
            border-solid border-[2px] border-slate-950 transition-transform
           hover:bg-blue-400
            ${
              expanded
                ? "translate-x-1 translate-y-1 bg-blue-400"
                : "bg-blue-800"
            }
            small:hidden
          `}
        >
          {!expanded ? (
            <svg
              className="w-2 h-2 text-white"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="6"
                d="m5 15 7-7 7 7"
              />
            </svg>
          ) : (
            <svg
              className="w-2 h-2 text-white"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="6"
                d="m19 9-7 7-7-7"
              />
            </svg>
          )}
        </button>

        {/* Custom Scrollbar */}
        <div
          ref={scrollbarRef}
          className="custom-scrollbar absolute top-0 left-0 h-[20px] bg-black/50 rounded cursor-pointer"
        ></div>

        {/* Scrollable Content */}
        <div
          ref={scrollableRef}
          className="scrollable relative flex align-middle overflow-x-auto overflow-y-hidden h-[calc(100%-20px)] top-5 "
        >
          <div className="flex w-max h-full">{children}</div>
        </div>
      </div>
    </>
  );
}

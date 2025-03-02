import "./customScroller.css";
import { useEffect, useRef, useState, useCallback } from "react";

export default function CustomScroller({ children }) {
  const scrollableRef = useRef(null);
  const scrollbarRef = useRef(null);
  const [expanded, setExpanded] = useState(false);
  const prevX = useRef(0); 

  const handleScroll = useCallback(() => {
    if (!scrollableRef.current || !scrollbarRef.current) return;

    const scrollable = scrollableRef.current;
    const customScrollbar = scrollbarRef.current;

    const { scrollLeft, scrollWidth, clientWidth } = scrollable;
    const scrollbarWidth = (clientWidth / scrollWidth) * clientWidth;
    const scrollPercentage = scrollLeft / (scrollWidth - clientWidth);

    customScrollbar.style.width = `${scrollbarWidth}px`;
    customScrollbar.style.left = `${scrollPercentage * (clientWidth - scrollbarWidth)}px`;
  }, []);

  const handleDrag = useCallback(
    (e) => {
      e.preventDefault();

      if (!scrollableRef.current || !scrollbarRef.current) return;

      const customScrollbar = scrollbarRef.current;
      const scrollable = scrollableRef.current;
      const { scrollWidth, clientWidth } = scrollable;
      const customScrollbarWidth = customScrollbar.offsetWidth;

      prevX.current = e.clientX || e.touches?.[0]?.clientX;

      const onMouseMove = (moveEvent) => {
        const currentX = moveEvent.clientX || moveEvent.touches?.[0]?.clientX;
        const deltaX = currentX - prevX.current;
        prevX.current = currentX;

        const newLeft = Math.min(
          Math.max(0, customScrollbar.offsetLeft + deltaX),
          clientWidth - customScrollbarWidth
        );

        customScrollbar.style.left = `${newLeft}px`;

        const scrollPercentage = newLeft / (clientWidth - customScrollbarWidth);
        scrollable.scrollLeft = scrollPercentage * (scrollWidth - clientWidth);
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
    },
    []
  );

  useEffect(() => {
    const scrollable = scrollableRef.current;
    const customScrollbar = scrollbarRef.current;

    if (!scrollable || !customScrollbar) return;

    scrollable.addEventListener("scroll", handleScroll, { passive: true });
    customScrollbar.addEventListener("mousedown", handleDrag, { passive: false });
    customScrollbar.addEventListener("touchstart", handleDrag, { passive: false });

    window.addEventListener("resize", handleScroll, { passive: true });

    handleScroll(); // Initial call to position scrollbar correctly

    return () => {
      scrollable.removeEventListener("scroll", handleScroll);
      customScrollbar.removeEventListener("mousedown", handleDrag);
      customScrollbar.removeEventListener("touchstart", handleDrag);
      window.removeEventListener("resize", handleScroll);
    };
  }, [handleScroll, handleDrag]);

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
        className={`bottom-0 left-0 w-full pl-2 pr-8 z-20 bg-[#F68F2Eff] transition-all duration-300 ease-in-out ${
          expanded
            ? "absolute bottom-0 left-0 h-[60vh] shadow-[0_-2px_8px_rgba(0,0,0,0.3)]"
            : "relative shadow-none"
        }`}
      >
        {/* Toggle Button */}
        {/* shadow */}
        <div className="absolute top-[2px] right-[6px] w-[24px] h-[24px] rounded-md bg-slate-950/40 translate-x-1 translate-y-1 small:hidden"></div>

        <button
          onClick={() => setExpanded((prev) => !prev)}
          className={`absolute top-[2px] right-[6px] z-30 text-white px-[6px] py-[6px] rounded-md
            border-solid border-[2px] border-white transition-transform
           hover:bg-blue-400
            ${
              expanded
                ? "translate-x-1 translate-y-1 bg-blue-400"
                : "bg-slate-950"
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
        {/* toggle button ends */}

        {/* Custom Scrollbar */}
        <div className="absolute top-[10px] w-full left-0 pl-2 pr-10 h-[2px] ">
          <div className="w-full left-0 h-[2px] bg-[#E2E29Cff]"></div>
        </div>
        <div
          ref={scrollbarRef}
          className="custom-scrollbar absolute top-[2px] left-0 h-[16px] bg-slate-950  rounded cursor-pointer z-10"
        ></div>
        {/* Custom Scrollbar ends */}
        {/* Scrollable Content */}
        <div
          ref={scrollableRef}
          className="scrollable relative flex align-middle overflow-x-auto overflow-y-hidden h-[calc(100%-20px)] top-5 "
        >
          <div className="flex w-max h-full">{children}</div>
        </div>
        {/* Scrollable Content ends */}
      </div>
    </>
  );
}

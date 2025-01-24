import "./scrollbar.css";
import { useEffect, useRef } from "react";

export default function ScrollablePiano({ children }) {
  const scrollableRef = useRef(null);
  const scrollbarRef = useRef(null);

  useEffect(() => {
    const scrollable = scrollableRef.current;
    const customScrollbar = scrollbarRef.current;

    // Function to sync the scrollbar position with the content scroll
    const handleScroll = () => {
      const scrollLeft = scrollable.scrollLeft;
      const scrollWidth = scrollable.scrollWidth;
      const clientWidth = scrollable.clientWidth;

      // Calculate the width of the custom scrollbar
      const scrollbarWidth = (clientWidth / scrollWidth) * clientWidth;
      customScrollbar.style.width = `${scrollbarWidth}px`;

      // Calculate and update the position of the custom scrollbar
      const scrollPercentage = scrollLeft / (scrollWidth - clientWidth);
      customScrollbar.style.left = `${scrollPercentage * (clientWidth - scrollbarWidth)}px`;
    };

    // Function to handle dragging of the custom scrollbar
    const handleDrag = (e) => {
      e.preventDefault(); // Prevent default dragging behavior

      const customScrollbarWidth = customScrollbar.offsetWidth;
      const scrollableWidth = scrollable.scrollWidth;
      const clientWidth = scrollable.clientWidth;

      // Track the previous X position
      let prevX = e.clientX || e.touches?.[0]?.clientX;

      const onMouseMove = (moveEvent) => {
        const currentX = moveEvent.clientX || moveEvent.touches?.[0]?.clientX;
        const deltaX = currentX - prevX;

        // Update prevX to the current position
        prevX = currentX;

        // Calculate the new left position of the scrollbar
        const newLeft = Math.min(
          Math.max(0, customScrollbar.offsetLeft + deltaX),
          clientWidth - customScrollbarWidth
        );

        customScrollbar.style.left = `${newLeft}px`;

        // Calculate the scroll percentage and update the scrollable content's position
        const scrollPercentage = newLeft / (clientWidth - customScrollbarWidth);
        scrollable.scrollLeft = scrollPercentage * (scrollableWidth - clientWidth);
      };

      const onMouseUp = () => {
        window.removeEventListener("mousemove", onMouseMove);
        window.removeEventListener("mouseup", onMouseUp);
        window.removeEventListener("touchmove", onMouseMove);
        window.removeEventListener("touchend", onMouseUp);
      };

      // Add event listeners for mouse and touch movements
      window.addEventListener("mousemove", onMouseMove);
      window.addEventListener("mouseup", onMouseUp);
      window.addEventListener("touchmove", onMouseMove);
      window.addEventListener("touchend", onMouseUp);
    };

    // Add event listeners to sync scroll and enable dragging
    scrollable.addEventListener("scroll", handleScroll);
    customScrollbar.addEventListener("mousedown", handleDrag);
    customScrollbar.addEventListener("touchstart", handleDrag);

    // Initialize the scrollbar position
    handleScroll();

    return () => {
      // Clean up event listeners
      scrollable.removeEventListener("scroll", handleScroll);
      customScrollbar.removeEventListener("mousedown", handleDrag);
      customScrollbar.removeEventListener("touchstart", handleDrag);
    };
  }, []);

  return (
    <div className="relative w-full h-full">
      {/* Custom Scrollbar */}
      <div
        ref={scrollbarRef}
        className="custom-scrollbar"
        style={{
          position: "absolute",
          top: "0px",
          left: "0px",
          height: "20px",
          background: "rgba(0, 0, 0, 0.5)",
          borderRadius: "4px",
          cursor: "pointer",
        }}
      ></div>

      {/* Scrollable Content */}
      <div
        ref={scrollableRef}
        className="scrollable"
        style={{
          overflowX: "auto",
          overflowY: "hidden",
          height: "100%",
          position: "relative",
          top: "20px"
        }}
      >
        <div className="flex w-max h-full">{children}</div>
      </div>
    </div>
  );
}

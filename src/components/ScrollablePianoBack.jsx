import "./scrollbar.css";
import { useEffect, useRef } from "react";

export default function ScrollablePiano({ children }) {
  const scrollableRef = useRef(null);
  const scrollbarRef = useRef(null);
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    const scrollable = scrollableRef.current;
    const customScrollbar = scrollbarRef.current;

    // Sync the scrollbar position with the content scroll
    const handleScroll = () => {
      const scrollLeft = scrollable.scrollLeft;
      const scrollWidth = scrollable.scrollWidth;
      const clientWidth = scrollable.clientWidth;

      // Width of the custom scrollbar
      const scrollbarWidth = (clientWidth / scrollWidth) * clientWidth;
      customScrollbar.style.width = `${scrollbarWidth}px`;

      // Update the position of the custom scrollbar
      const scrollPercentage = scrollLeft / (scrollWidth - clientWidth);
      customScrollbar.style.left = `${
        scrollPercentage * (clientWidth - scrollbarWidth)
      }px`;
    };

    const handleResize = () => {
      // Trigger recalculation of the scrollbar dimensions on resize
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

    // Event listeners for scroll and dragging
    scrollable.addEventListener("scroll", handleScroll);
    customScrollbar.addEventListener("mousedown", handleDrag);
    customScrollbar.addEventListener("touchstart", handleDrag);

    // Event listener for resize
    window.addEventListener("resize", handleResize);

    // Initialize the scrollbar position
    handleScroll();

    return () => {
      scrollable.removeEventListener("scroll", handleScroll);
      customScrollbar.removeEventListener("mousedown", handleDrag);
      customScrollbar.removeEventListener("touchstart", handleDrag);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className="relative w-full h-full pl-1 pr-8">
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
          top: "20px",
        }}
      >
        <div className="flex w-max h-full">{children}</div>
      </div>
    </div>
  );
}

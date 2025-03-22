import { useEffect } from "react";

const useViewportHeight = () => {
  useEffect(() => {
    const setHeight = () => {
      const vh = document.documentElement.clientHeight; // Force real height
      document.documentElement.style.setProperty('--vh', `${vh * 0.01}px`);
    };

    setHeight(); // Set height on mount
    window.addEventListener("resize", setHeight);

    return () => {
      window.removeEventListener("resize", setHeight);
    };
  }, []);
};

export default useViewportHeight;


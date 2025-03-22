import { useEffect } from "react";

const useViewportHeight = () => {
  useEffect(() => {
    const setHeight = () => {
      const vh = window.visualViewport?.height || window.innerHeight;
      document.documentElement.style.setProperty('--vh', `${vh * 0.01}px`);
    };

    setHeight(); // Set on mount
    window.addEventListener("resize", setHeight);
    window.visualViewport?.addEventListener("resize", setHeight);

    return () => {
      window.removeEventListener("resize", setHeight);
      window.visualViewport?.removeEventListener("resize", setHeight);
    };
  }, []);
};

export default useViewportHeight;


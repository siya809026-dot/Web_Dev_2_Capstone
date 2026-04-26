import { useState, useEffect } from "react";

// debounce hook — avoids re-rendering on every keystroke
// referenced from https://usehooks.com/useDebounce/
function useDebounce(value, delay = 400) {
  const [debouncedVal, setDebouncedVal] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedVal(value);
    }, delay);

    return () => clearTimeout(timer);
  }, [value, delay]);

  return debouncedVal;
}

export default useDebounce;

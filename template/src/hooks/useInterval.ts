import React from "react";

// Call function on a regular basis in <intervalMs>.
// setInterval gets cleared when component unmounts.
//
// Taken from https://overreacted.io/making-setinterval-declarative-with-react-hooks/
export function useInterval(callback: () => void, intervalMs?: number) {
    const savedCallback = React.useRef<() => void>();

    // Remember the latest callback.
    React.useEffect(() => {
        savedCallback.current = callback;
    }, [callback]);

    // Set up the interval.
    React.useEffect(() => {
        function tick() {
            savedCallback.current?.();
        }
        if (intervalMs) {
            const id = setInterval(tick, intervalMs);
            return () => clearInterval(id);
        }
    }, [intervalMs]);
}

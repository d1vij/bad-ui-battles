type VibrateFn = (pattern: number | number[]) => boolean;

const vibrator: VibrateFn =
    "vibrate" in navigator && typeof navigator.vibrate === "function"
        ? (pattern) => navigator.vibrate(pattern)
        : () => {
              console.log("I tried vibrating here (╥﹏╥)");
              return false;
          };

// Hook which enables vibration if browser
// supports vibration otherwise does nothing
export function useVibrate() {
    return vibrator;
}

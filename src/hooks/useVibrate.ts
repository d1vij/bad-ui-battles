type VibrateFn = (pattern: number | number[]) => boolean;

let vibrator: VibrateFn;

if ("vibrate" in navigator && typeof navigator.vibrate === "function") {
    vibrator = (pattern) => navigator.vibrate(pattern);
} else {
    console.log("Your device doesn't support vibrations (╥﹏╥)");
    vibrator = () => false;
}

// Hook which allows vibration if browser supports vibration otherwise does nothing
// Returns true if vibration was successfull, otherwise false
export function useVibrate() {
    return vibrator;
}

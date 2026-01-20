import styles from "./screw.module.scss";

import { useRef } from "react";

import { useVibrate } from "@/hooks";
import screw from "@/assets/skrew.webp";
import type { ScrewTypes } from "./types";

// PS: Click the circle
export default function Screw({ className = "" }: ScrewTypes) {
    const ref = useRef<HTMLImageElement>(null);
    const vibrator = useVibrate();

    function handleClick(e: React.MouseEvent<HTMLImageElement>) {
        e.stopPropagation();
        ref.current?.classList.add(styles.fall);
        vibrator(100);
        setTimeout(() => {
            const el = ref.current;
            if (el && el.isConnected) {
                el.remove();
            }
        }, 1000);
    }

    return (
        <img
            onClick={handleClick}
            ref={ref}
            draggable="false"
            src={screw}
            className={className + " " + "z-30 size-8 origin-center cursor-help select-none hover:scale-105 md:size-10"}
        />
    );
}

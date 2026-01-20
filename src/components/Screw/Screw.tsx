import styles from "./screw.module.scss";
import { useEffect, useRef, useState } from "react";

import { useVibrate } from "@/hooks";
import screw from "@/assets/skrew.webp";
import type { ScrewTypes } from "./types";

// PS: Click the circle
export default function Screw({ className = "" }: ScrewTypes) {
    const vibrator = useVibrate();
    const [visible, setVisible] = useState(true);
    const ref = useRef<HTMLImageElement>(null);
    const timeoutRef = useRef<number>(undefined);
    const [falling, setFalling] = useState(false);

    function handleClick(e: React.MouseEvent<HTMLImageElement>) {
        e.stopPropagation();
        vibrator(100);
        setFalling(true);
        timeoutRef.current = setTimeout(() => {
            setVisible(false);
        }, 1000);
    }

    // clear the timeout incase the node is unmounted before the timeout could run
    useEffect(() => {
        return () => {
            if (timeoutRef.current != undefined) {
                clearTimeout(timeoutRef.current);
            }
        };
    }, []);

    if (!visible) {
        return null;
    }
    return (
        <img
            ref={ref}
            onClick={handleClick}
            draggable="false"
            src={screw}
            className={`${className} ${falling ? styles.fall : ""} z-30 size-8 origin-center cursor-help select-none
                hover:scale-105 md:size-10`}
        />
    );
}

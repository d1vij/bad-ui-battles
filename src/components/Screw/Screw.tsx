import styles from "./screw.module.scss";

import { useRef } from "react";

import screw from "@/assets/skrew.webp";
import type { ScrewTypes } from "./types";

// PS: Click the circle
export default function Screw({ className = "" }: ScrewTypes) {
    const ref = useRef<HTMLImageElement>(null);

    function handleClick() {
        ref.current?.classList.add(styles.fall);
        setTimeout(() => {
            ref.current?.remove();
        }, 1000);
    }

    return (
        <img
            onClick={handleClick}
            ref={ref}
            draggable="false"
            src={screw}
            className={className + " " + "size-8 origin-center cursor-help select-none hover:scale-105 md:size-10"}
        />
    );
}

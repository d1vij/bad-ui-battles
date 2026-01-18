import screw from "@/assets/skrew.webp";
import type { ScrewTypes } from "./types";

export default function Screw({ className = "" }: ScrewTypes) {
    return (
        <img
            draggable="false"
            src={screw}
            className={className + " " + "size-8 origin-center select-none md:size-10"}
        />
    );
}

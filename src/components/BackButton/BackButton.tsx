import type { BackButtonProps } from "./types";

import Clickable from "@/components/Clickable";

export default function BackButton({ setActiveSite }: BackButtonProps) {
    function handleClick() {
        setActiveSite(undefined);
    }
    return (
        <Clickable handleClick={handleClick}>
            <p className="w-fit text-4xl">Back</p>
        </Clickable>
    );
}

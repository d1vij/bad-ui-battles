import { useVibrate } from "@/hooks";
import type { ClickableProps } from "./types";

export default function Clickable({ children, handleClick }: ClickableProps) {
    const vibrator = useVibrate();
    function onClick() {
        vibrator(100);
        setTimeout(() => handleClick(), 200);
    }
    return (
        <div
            className="border-pop-black relative m-1 min-h-fit cursor-pointer select-none active:shadow-2xl"
            onClick={onClick}
        >
            <div
                className={`border-pop-black pointer-events-none absolute z-10 mt-3 h-full w-full rounded-b border-3
                    bg-gray-700`}
            ></div>
            <div
                className="bg-pop-skin relative z-20 h-full border-3 p-1 transition-transform duration-150 ease-out
                    active:translate-y-3 active:rounded-b"
            >
                {children}
            </div>
        </div>
    );
}

import pen from "./pen.png";
import { useVibrate } from "@/hooks";
import { useState } from "react";

// https://www.reddit.com/r/badUIbattles/comments/f7ho5t/please_enter_your_qr_code_below/
export default function QRCodeScanner() {
    const cells = [];
    for (let idx = 0; idx < 400; idx++) {
        cells.push(<QrCell key={idx} />);
    }

    return (
        <div className="absolute top-0 left-0 flex size-full flex-col items-center justify-center bg-blue-300">
            <h1 className="mt-10 mb-6 text-center text-3xl tracking-tight text-nowrap text-black md:text-4xl">
                Please input your QR
            </h1>
            <div className="relative">
                <div
                    className={`border-pop-black grid size-80 grid-cols-20 grid-rows-20 gap-0 overflow-clip rounded-md
                        border-2`}
                >
                    {cells}
                </div>
                <p className="absolute right-2">20 x 20</p>
            </div>
            <p className="absolute right-2 bottom-0">Powered by our Smartest AI™</p>
        </div>
    );
}

function QrCell() {
    const vibrator = useVibrate();
    const [isActive, setIsActive] = useState(false);

    function handleClick() {
        setIsActive(!isActive);
        vibrator(50);
    }

    return (
        <div
            onClick={handleClick}
            style={{
                backgroundColor: isActive ? "black" : "white",
                cursor: `url(${pen}) 0 24, crosshair`,
            }}
            className={"select-none"}
        ></div>
    );
}

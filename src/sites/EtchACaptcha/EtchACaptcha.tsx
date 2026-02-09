import styles from "./etchacaptcha.module.scss";
import { useCallback, useEffect, useRef, useState } from "react";
import { gc } from "@/lib";
import { useVibrate } from "@/hooks";

type ArrowKeys = `Arrow${"Left" | "Up" | "Right" | "Down"}`;

export default function EtchACaptcha() {
    const timeRef = useRef(Date.now());

    const etchRef = useRef<HTMLDivElement>(null);

    const pathCanvasRef = useRef<HTMLCanvasElement>(null);
    const pathContextRef = useRef<CanvasRenderingContext2D | null>(null);

    const pointerCanvasRef = useRef<HTMLCanvasElement>(null);
    const pointerContextRef = useRef<CanvasRenderingContext2D | null>(null);

    const [coordinates, setCoordinates] = useState({ x: 0, y: 0 });

    const [isShaking, setIsShaking] = useState(false);

    const getContext = useCallback(() => {
        const pathCanvas = pathCanvasRef.current;
        const pathCtx = pathContextRef.current;
        const pointerCanvas = pointerCanvasRef.current;
        const pointerCtx = pointerContextRef.current;

        if (!pathCanvas || !pathCtx || !pointerCanvas || !pointerCtx) {
            throw new Error("Canvas not initialized");
        }

        return { pathCanvas, pathCtx, pointerCanvas, pointerCtx };
    }, []);

    // canvas setup
    useEffect(() => {
        const dpr = window.devicePixelRatio || 1;

        function setupCanvas(
            canvasRef: React.RefObject<HTMLCanvasElement | null>,
            ctxRef: React.RefObject<CanvasRenderingContext2D | null>,
        ) {
            const canvas = canvasRef.current;
            if (!canvas) return;

            const ctx = canvas.getContext("2d");
            if (!ctx) return;
            ctxRef.current = ctx;

            const rect = canvas.getBoundingClientRect();

            canvas.width = Math.round(rect.width * dpr);
            canvas.height = Math.round(rect.height * dpr);

            canvas.style.width = `${rect.width}px`;
            canvas.style.height = `${rect.height}px`;

            ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
        }

        setupCanvas(pathCanvasRef, pathContextRef);
        setupCanvas(pointerCanvasRef, pointerContextRef);

        const { pathCanvas, pathCtx, pointerCtx } = getContext();
        const rect = pathCanvas.getBoundingClientRect();

        const startX = Math.floor(rect.width / 2);
        const startY = Math.floor(rect.height / 2);

        setCoordinates({ x: startX, y: startY });

        pathCtx.beginPath();
        pathCtx.moveTo(startX, startY);

        pointerCtx.beginPath();
        pointerCtx.arc(startX, startY, 5, 0, Math.PI * 2);
        pointerCtx.fill();
        pointerCtx.closePath();
    }, [getContext]);

    const moveDirection = useCallback(
        (direction: ArrowKeys) => {
            const unit = 5;
            const margin = 10;

            const { pathCanvas, pathCtx, pointerCtx, pointerCanvas } =
                getContext();
            const rect = pathCanvas.getBoundingClientRect();

            let { x, y } = coordinates;

            if (direction === "ArrowRight" && x + unit <= rect.width - margin)
                x += unit;
            else if (
                direction === "ArrowDown" &&
                y + unit <= rect.height - margin
            )
                y += unit;
            else if (direction === "ArrowLeft" && x - unit >= margin) x -= unit;
            else if (direction === "ArrowUp" && y - unit >= margin) y -= unit;
            else return;

            pointerCtx.clearRect(
                0,
                0,
                pointerCanvas.width,
                pointerCanvas.height,
            );
            pointerCtx.beginPath();
            pointerCtx.arc(x, y, 5, 0, Math.PI * 2);
            pointerCtx.fill();
            pointerCtx.closePath();

            pathCtx.lineTo(x, y);
            pathCtx.stroke();

            setCoordinates({ x, y });
        },
        [coordinates, getContext],
    );

    // keyboard motion
    useEffect(() => {
        function handleKeyDown(e: KeyboardEvent) {
            if (!e.key.startsWith("Arrow")) return;

            const now = Date.now();
            if (now - timeRef.current > 50) {
                timeRef.current = now;
                moveDirection(e.key as ArrowKeys);
            }
        }

        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [moveDirection]);

    // clear animation

    useEffect(() => {
        if (isShaking === false) return;
        const etch = etchRef.current;
        if (etch == null) return;

        etch.classList.add(styles.shake);
        const timeout = setTimeout(() => {
            etch.classList.remove(styles.shake);

            const { pathCtx, pathCanvas } = getContext();
            pathCtx.beginPath();
            pathCtx.clearRect(0, 0, pathCanvas.width, pathCanvas.height);
            pathCtx.closePath();
            setIsShaking(false);
        }, 500);

        return () => {
            clearTimeout(timeout);
        };
    }, [isShaking]);

    return (
        <div className="bg-red-100 absolute inset-0 flex flex-col items-center justify-center">
            <section
                ref={etchRef}
                className={gc(
                    isShaking ? styles.shake : "",
                    "bg-[#b0011d] border border-[hsl(from_#b0011d_h_s_calc(l-10))] size-70 rounded-xl p-4 mt-8",
                )}
                style={{
                    background:
                        "radial-gradient(circle, rgba(125,1,21,1) 0%, rgba(176,1,29,1) 59%, rgba(125,1,21,1) 100%)",
                }}
            >
                <div className="relative size-full ">
                    <div className="absolute inset-0 bg-[hsl(from_#b0011d_h_s_calc(l-10))] rounded-2xl opacity-30 blur size-full"></div>

                    <canvas
                        ref={pathCanvasRef}
                        className="absolute inset-0 z-10 rounded-3xl bg-[#e2e2e2] size-full"
                        style={{
                            boxShadow:
                                "0px 4px 6px -1px rgba(158,0,26,0.1), inset 0px 2px 18px -2px rgba(158,0,26,0.1)",
                        }}
                    />

                    <canvas
                        ref={pointerCanvasRef}
                        className="absolute inset-0 z-20 rounded-3xl bg-transparent size-full"
                    />
                </div>
            </section>
            <button
                type="button"
                className="hover:underline active:underline decoration-2 cursor-pointer"
                onClick={() => setIsShaking(true)}
            >
                clear
            </button>

            <section className="grid grid-cols-[2fr_1fr_1fr]  gap-1 w-50 mt-7 h-fit">
                <div className="flex flex-col gap-1">
                    <Button
                        label="↑"
                        onClick={() => moveDirection("ArrowUp")}
                    />
                    <Button
                        label="↓"
                        onClick={() => moveDirection("ArrowDown")}
                    />
                </div>
                <Button label="←" onClick={() => moveDirection("ArrowLeft")} />
                <Button label="→" onClick={() => moveDirection("ArrowRight")} />
            </section>
        </div>
    );
}

function Button({ label, onClick }: { label: string; onClick: VoidFunction }) {
    const intervalRef = useRef<number | null>(null);
    const vibrate = useVibrate();

    function fire() {
        vibrate(50);
        onClick();
    }

    function startHolding() {
        intervalRef.current = window.setInterval(fire, 200);
    }

    function stopHolding() {
        if (intervalRef.current !== null) {
            clearInterval(intervalRef.current);
            intervalRef.current = null;
        }
    }

    return (
        <button
            type="button"
            className="bg-[#e2e2e2] text-2xl rounded-lg border-2 border-[#9b001980] active:border-[#9b0019] hover:border-[#9b0019] cursor-pointer active:shadow select-none"
            onClick={fire}
            onPointerDown={startHolding}
            onPointerUp={stopHolding}
            onPointerLeave={stopHolding}
            onPointerCancel={stopHolding}
        >
            {label}
        </button>
    );
}

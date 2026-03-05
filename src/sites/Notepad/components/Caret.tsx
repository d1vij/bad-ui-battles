import { useRef, useState, useEffect } from "react";

export function Caret({
    containerRef,
}: {
    containerRef: React.RefObject<HTMLTextAreaElement | null>;
}) {
    const caretRef = useRef<HTMLSpanElement>(null);

    const [metrics, setMetrics] = useState({
        charWidth: 0,
        lineHeight: 0,
        charsPerLine: 0,
    });

    const [position, _] = useState(80);
    const [isVisible, setIsVisible] = useState(true);

    // no responsiveness, pls dont change dimensions client side
    // or else the caret position would mismatch actual one
    useEffect(() => {
        if (!containerRef.current) return;

        const styles = getComputedStyle(containerRef.current);

        const temp = document.createElement("span");
        temp.style.font = styles.font;
        temp.style.position = "absolute";
        temp.style.visibility = "hidden";
        temp.style.whiteSpace = "pre";
        temp.textContent = "0";

        document.body.appendChild(temp);

        const charWidth = temp.offsetWidth;
        const lineHeight = temp.offsetHeight;
        console.log(lineHeight);

        temp.remove();

        const width =
            containerRef.current.clientWidth -
            parseFloat(styles.paddingLeft) -
            parseFloat(styles.paddingRight);

        const charsPerLine = Math.floor(width / charWidth);

        setMetrics({
            charWidth,
            lineHeight,
            charsPerLine,
        });
    }, []);

    // caret blinking
    useEffect(() => {
        const id = setInterval(() => setIsVisible((v) => !v), 1000);
        return () => clearInterval(id);
    });

    const row = Math.floor(position / metrics.charsPerLine);
    const col = position % metrics.charsPerLine;

    return (
        <span
            ref={caretRef}
            className="absolute bg-red-400/80 w-[1ch]"
            style={{
                height: metrics.lineHeight,
                transform: `translate(${col}ch, ${row * metrics.lineHeight}px)`,
                display: isVisible ? "block" : "none",
            }}
        />
    );
}

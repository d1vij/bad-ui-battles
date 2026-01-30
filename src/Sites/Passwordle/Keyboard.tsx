import type { PropsWithChildren } from "@/types";
import type React from "react";
import type { InputActions } from "./Passwordle";
import { KeyAction } from "./constants";
import { useVibrate } from "@/hooks";

const keyboardLayout = [
    ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"],
    ["A", "S", "D", "F", "G", "H", "J", "K", "L"],
    ["Z", "X", "C", "V", "B", "N", "M"],
];

type KeyboardRowProps = PropsWithChildren;
function KeyboardRow({ children }: KeyboardRowProps) {
    return <div className="flex items-center justify-center">{children}</div>;
}

type KeyboardKeyProps = {
    letter: string;
    onClick: VoidFunction;
};
export function KeyboardKey({ letter, onClick }: KeyboardKeyProps) {
    const vibrator = useVibrate();
    function handleClick() {
        vibrator(100);
        onClick();
    }

    return (
        <button
            onClick={handleClick}
            className="m-1 mx-0.5 flex w-fit cursor-pointer items-center rounded bg-[#818384] p-3.5 px-3 text-sm
                font-semibold tracking-wide uppercase select-none active:bg-[hsl(from_#818384_h_s_40)] md:p-4 md:px-3.5"
        >
            {letter}
        </button>
    );
}

type KeyboardProps = {
    dispatchInput: React.ActionDispatch<[InputActions]>;
};

export default function KeyBoard({ dispatchInput }: KeyboardProps) {
    return (
        <div>
            <KeyboardRow>
                {keyboardLayout[0].map((l, i) => (
                    <KeyboardKey
                        key={i}
                        letter={l}
                        onClick={() => dispatchInput({ type: KeyAction.keypress, letter: l })}
                    />
                ))}
            </KeyboardRow>

            <KeyboardRow>
                {keyboardLayout[1].map((l, i) => (
                    <KeyboardKey
                        key={i}
                        letter={l}
                        onClick={() => dispatchInput({ type: KeyAction.keypress, letter: l })}
                    />
                ))}
            </KeyboardRow>

            <KeyboardRow>
                {/*Enter Key*/}
                <KeyboardKey letter="Enter" onClick={() => dispatchInput({ type: KeyAction.enter })} />

                {keyboardLayout[2].map((l, i) => (
                    <KeyboardKey
                        key={i}
                        letter={l}
                        onClick={() => dispatchInput({ type: KeyAction.keypress, letter: l })}
                    />
                ))}
                {/*Backspace Key*/}
                <KeyboardKey letter="⌫" onClick={() => dispatchInput({ type: KeyAction.backspace })} />
            </KeyboardRow>
        </div>
    );
}

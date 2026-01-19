import type { PropsWithChildren } from "@/types";
import type React from "react";
import type { InputActions } from "./Passwordle";
import { KeyAction } from "./constants";

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
    handleClick: VoidFunction;
};
export function KeyboardKey({ letter, handleClick }: KeyboardKeyProps) {
    return (
        <div
            onClick={handleClick}
            className="m-1 mx-0.5 flex w-fit cursor-pointer items-center rounded border-3 border-[#818384] bg-[#818384]
                p-2 px-2.5 text-sm font-semibold tracking-wide uppercase select-none"
        >
            {letter}
        </div>
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
                        handleClick={() => dispatchInput({ type: KeyAction.keypress, letter: l })}
                    />
                ))}
            </KeyboardRow>

            <KeyboardRow>
                {keyboardLayout[1].map((l, i) => (
                    <KeyboardKey
                        key={i}
                        letter={l}
                        handleClick={() => dispatchInput({ type: KeyAction.keypress, letter: l })}
                    />
                ))}
            </KeyboardRow>

            <KeyboardRow>
                {/*Enter Key*/}
                <KeyboardKey letter="Enter" handleClick={() => dispatchInput({ type: KeyAction.enter })} />

                {keyboardLayout[2].map((l, i) => (
                    <KeyboardKey
                        key={i}
                        letter={l}
                        handleClick={() => dispatchInput({ type: KeyAction.keypress, letter: l })}
                    />
                ))}
                {/*Backspace Key*/}
                <KeyboardKey letter="⌫" handleClick={() => dispatchInput({ type: KeyAction.backspace })} />
            </KeyboardRow>
        </div>
    );
}

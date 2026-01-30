// https://www.reddit.com/r/badUIbattles/comments/txn7na/it_came_to_me_in_a_fever_dream_passwordle/
import { useReducer, useState } from "react";

import styles from "./passwordle.module.scss";
import KeyBoard from "./Keyboard";
import { KeyAction } from "./constants";
import { getRandomPassword } from "./getRandomPassword";
import PasswordIcons from "./PasswordIcons";

export type InputActions =
    | { type: KeyAction.keypress; letter: string }
    | { type: KeyAction.backspace }
    | { type: KeyAction.enter };

function inputReducer(state: string[], action: InputActions): string[] {
    switch (action.type) {
        case KeyAction.keypress:
            return [...state, action.letter];
        case KeyAction.backspace:
            return state.slice(0, -1);
        case KeyAction.enter:
        default:
            return state;
    }
}

export default function Passwordle() {
    const [password] = useState(getRandomPassword().split(""));
    const [currentInput, dispatchInput] = useReducer(inputReducer, []);

    return (
        <div
            className={
                styles.passwordle +
                " " +
                "absolute top-0 left-0 flex size-full items-center justify-center bg-[#121213] text-[#f8f8f8]"
            }
        >
            <div className="mt-30 w-full md:w-fit flex flex-col items-center">

                {/*password*/}
                <div className="flex  w-[70%] flex-col justify-center">
                    <div
                        className="flex h-18 w-full items-center overflow-x-scroll overflow-y-hidden rounded border-3
                            border-[#3a3a3c] p-2 px-3 text-3xl text-nowrap"
                    >
                        {"* ".repeat(currentInput.length)}
                    </div>
                    {/*Icons*/}
                    <PasswordIcons password={password} inputtedPassword={currentInput} />
                </div>
                {/*keyboard*/}
                <KeyBoard dispatchInput={dispatchInput} />
            </div>
        </div>
    );
}

import { useVibrate } from "@/hooks";
import { useTextAreaContext, type Direction } from "../TextAreaContext";
import { MenuItem } from "./Menu";

type InsertKeyProps = {
    char: string;
};
export function InsertKey({ char }: InsertKeyProps) {
    const vibrator = useVibrate();
    const { insertChar: appendChars } = useTextAreaContext();

    function handleCLick() {
        vibrator(50);
        appendChars(char);
    }

    return (
        <MenuItem hasPopup={false}>
            <button type="button" onClick={handleCLick}>
                {char}
            </button>
        </MenuItem>
    );
}

export function BackspaceKey() {
    const vibrator = useVibrate();
    const { deleteChars } = useTextAreaContext();

    function handleCLick() {
        vibrator(50);
        deleteChars(1, "Left");
    }

    return (
        <MenuItem hasPopup={false}>
            <button type="button" onClick={handleCLick}>
                Backspace
            </button>
        </MenuItem>
    );
}

export function EnterKey() {
    const vibrator = useVibrate();
    const { insertChar: appendChars } = useTextAreaContext();

    function handleCLick() {
        vibrator(50);
        appendChars("\n");
    }

    return (
        <MenuItem hasPopup={false}>
            <button type="button" onClick={handleCLick}>
                Enter
            </button>
        </MenuItem>
    );
}

type MoveKeyProps = {
    towards: Direction;
};
export function MoveKey({ towards }: MoveKeyProps) {
    const vibrator = useVibrate();
    const { moveCaret } = useTextAreaContext();

    function handleCLick() {
        vibrator(50);
        switch (towards) {
            case "Right":
            case "Left": {
                moveCaret(1, towards);
                break;
            }
            case "Up":
            case "Down":
        }
    }

    return (
        <MenuItem hasPopup={false}>
            <button type="button" onClick={handleCLick}>
                {towards}
            </button>
        </MenuItem>
    );
}

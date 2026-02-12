import type { PropsWithChildren, StateSetter } from "@/types";
import { createContext, useContext, useRef, useState } from "react";

type TextAreaContextProps = {
    text: string;
    setText: StateSetter<string>;
    ref: React.RefObject<HTMLTextAreaElement | null>;
};

const TextAreaContext = createContext<TextAreaContextProps | null>(null);

export type Direction = "Right" | "Left" | "Up" | "Down";

type TextAreaContextProviderProps = PropsWithChildren & {
    initial?: string;
};
export function TextAreaContextProvider({
    children,
    initial = "",
}: TextAreaContextProviderProps) {
    const [text, setText] = useState(initial);
    const ref = useRef<HTMLTextAreaElement>(null);
    return (
        <TextAreaContext value={{ text, setText, ref }}>
            {children}
        </TextAreaContext>
    );
}

export function useTextAreaContext() {
    const ctx = useContext(TextAreaContext);
    if (ctx === null)
        throw new Error(
            "use context hook can only be used within an equivalent context provider",
        );

    const { text, setText, ref: textAreaRef } = ctx;

    function insertChar(char: string) {
        const elm = textAreaRef.current;
        if (elm === null) return;

        setText((t) => {
            setTimeout(elm.focus, 0);
            return (
                t.slice(0, elm.selectionStart) +
                char +
                t.slice(elm.selectionStart)
            );
        });
    }

    function deleteChars(count: number, towards: Direction) {
        const elm = textAreaRef.current;
        if (elm === null) return;
        const pos = elm.selectionStart;

        if (towards === "Left") {
            setText((t) => {
                setTimeout(() => {
                    elm.setSelectionRange(pos - count, pos - count);
                    elm.focus();
                }, 0);

                // breaks for count >= text.length but yeah anyways single chars would be deleted at most
                return t.slice(0, pos - count) + t.slice(pos);
            });
        } else if (towards === "Right") {
            setText((t) => {
                setTimeout(() => {
                    elm.setSelectionRange(pos, pos);
                    elm.focus();
                }, 0);
                return (
                    t.slice(0, elm.selectionStart) +
                    t.slice(elm.selectionStart + count)
                );
            });
        }
        elm.focus();
    }

    function moveCaret(count: number, towards: Direction) {
        const elm = textAreaRef.current;
        if (elm === null) return;

        const start = elm.selectionStart;

        switch (towards) {
            case "Left": {
                if (start <= count) {
                    elm.setSelectionRange(0, 0);
                } else {
                    elm.setSelectionRange(start - count, start - count);
                }
                break;
            }
            case "Right": {
                if (count >= text.length) {
                    elm.setSelectionRange(text.length, text.length);
                } else {
                    elm.setSelectionRange(start + count, start + count);
                }
                break;
            }
            case "Up": {
                break;
            }
            case "Down": {
                break;
            }
        }

        elm.focus();
    }

    return {
        ref: textAreaRef,
        text,
        insertChar,
        deleteChars,
        moveCaret,
    };
}

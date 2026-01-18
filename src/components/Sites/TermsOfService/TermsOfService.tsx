// https://www.reddit.com/r/badUIbattles/comments/1qfeide/terms_of_service/
import type { StateSetter } from "@/types";
import { useId, useMemo, useRef, useState } from "react";

export type TermsOfServiceProps = {
    tos: string;
};

export default function TermsOfServiceLoader() {
    return <TermsOfService tos="ar BazFoo Bar Baz" />;
}

export function TermsOfService({ tos }: TermsOfServiceProps) {
    const words = useMemo(() => tos.split(/\s+/).filter(Boolean), [tos]);
    const maxCount = useRef(words.length + 1); // +1 for the ackowledgement
    const [count, setCount] = useState(0);
    const elms = words.map((w) => <Checkbox content={w} setCount={setCount} />);

    const [activeModal, setActiveModal] = useState<"success" | "faliure" | undefined>();

    function handleSubmit() {
        if (count === maxCount.current) {
            setActiveModal("success");
        } else {
            setActiveModal("faliure");
        }
    }

    return (
        <div className="relative flex h-full w-full items-center justify-center bg-zinc-100 p-3 font-serif">
            <div className="mb-20 h-[70%] max-w-120 rounded-3xl border-2 border-stone-400/80 bg-zinc-300 p-4">
                {activeModal === "success" && <SuccessModal setActiveModal={setActiveModal} />}
                {activeModal === "faliure" && <FaliureModal setActiveModal={setActiveModal} />}

                <div
                    className="flex h-full flex-col rounded-3xl border-2 border-stone-400/10 bg-stone-200 p-2 shadow-xl"
                >
                    <h1 className="text-3xl font-semibold tracking-tight text-shadow-black md:text-4xl">
                        Terms of Service
                    </h1>
                    <h2 className="text-sm font-medium">Please read the agreement carefully before proceeding</h2>

                    {/*tos checkboxes*/}
                    <section
                        className="flex-1 grow overflow-y-auto rounded bg-white p-2 inset-shadow-sm
                            inset-shadow-stone-500/80"
                    >
                        {elms}
                    </section>

                    {/*confirmation*/}
                    <div className="mt-2 **:hover:underline">
                        <Checkbox content="I agree to the Terms of Service" setCount={setCount} align="before" />
                    </div>
                    <button
                        onClick={handleSubmit}
                        className="mx-auto w-fit cursor-pointer rounded-3xl border-2 border-zinc-500/20 bg-zinc-400 p-2
                            text-lg inset-shadow-zinc-700/30 active:inset-shadow-sm"
                    >
                        I Agree
                    </button>
                </div>
            </div>

            <p className="absolute bottom-2 left-0 w-full text-center text-sm">© 2025 Some not so evil corp </p>
        </div>
    );
}

type CheckboxProps = {
    content: string;
    setCount: StateSetter<number>;
    align?: "before" | "after";
};

function Checkbox({ content, setCount, align = "after" }: CheckboxProps) {
    const [checked, setChecked] = useState(false);

    function handleClick() {
        if (checked) {
            setCount((c) => c - 1);
        } else setCount((c) => c + 1);

        setChecked(!checked);
    }

    const id = useId();
    return (
        <label htmlFor={id} className="mx-0.5 inline-block cursor-pointer text-center">
            {align === "after" && content}
            <input
                type="checkbox"
                onChange={handleClick}
                checked={checked}
                id={id}
                className="mx-1 checked:bg-red-300"
            />
            {align === "before" && content}
        </label>
    );
}

type AbstractModalProps = {
    title: string;
    children: string;
} & ModalProps;

function Modal({ title, children, setActiveModal }: AbstractModalProps) {
    function handleClick() {
        setActiveModal(undefined);
    }

    return (
        <div
            onClick={handleClick}
            className="absolute top-0 left-0 z-20 flex size-full items-center justify-center bg-gray-400/20
                backdrop-blur-xs"
        >
            <div
                className="flex h-1/3 w-80 items-center justify-center rounded-3xl border-stone-400/80 bg-zinc-300 p-4
                    shadow-sm shadow-stone-400"
            >
                <div
                    className="flex size-full flex-col items-center justify-center rounded-3xl border-2
                        border-stone-400/10 bg-stone-300 text-stone-800 shadow-sm shadow-stone-400"
                >
                    <h1 className="mt-2 mb-3 text-center text-5xl font-semibold uppercase">{title}</h1>
                    <div className="text-center text-xl">{children}</div>
                    <button
                        onClick={handleClick}
                        className="mt-1 w-fit cursor-pointer rounded-3xl border-2 border-zinc-500/20 bg-zinc-400 p-2
                            px-3 text-lg inset-shadow-zinc-700/30 active:inset-shadow-sm"
                    >
                        Close
                    </button>
                </div>
            </div>
        </div>
    );
}

type ModalProps = {
    setActiveModal: StateSetter<"success" | "faliure" | undefined>;
};

function FaliureModal({ setActiveModal }: ModalProps) {
    return (
        <Modal setActiveModal={setActiveModal} title="faliure">
            Please acknowledge all the clauses before proceeding !! &nbsp;&nbsp;&nbsp; (˶ᵔ ᵕ ᵔ˶)
        </Modal>
    );
}

function SuccessModal({ setActiveModal }: ModalProps) {
    return (
        <Modal setActiveModal={setActiveModal} title="success">
            We hope you read all the clauses carefully !! ಠಿ_ಠ
        </Modal>
    );
}

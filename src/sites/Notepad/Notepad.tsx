/** biome-ignore-all lint/a11y/noNoninteractiveElementToInteractiveRole: n> */
/** biome-ignore-all lint/a11y/useFocusableInteractive: <*/
import "7.css/dist/7.scoped.css";
import { gc } from "@/lib";
import styles from "./notepad.module.scss";
import { TextAreaContextProvider, useTextAreaContext } from "./TextAreaContext";
import { Menubar, MenuItem, Menu } from "./components/Menu";
import {
    BackspaceKey,
    EnterKey,
    InsertKey,
    MoveKey,
} from "./components/KeysTypaaaaaas";
import { useEffect } from "react";

export default function NotepadWrapper() {
    return (
        <TextAreaContextProvider initial="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim aeque doleamus animo, cum corpore dolemus, fieri tamen permagna accessio potest, si aliquod aeternum et infinitum impendere malum nobis opinemur. Quod idem licet transferre in voluptatem, ut postea variari voluptas distinguique possit, augeri amplificarique non possit. At etiam Athenis, ut.">
            <Notepad />
        </TextAreaContextProvider>
    );
}

const INSERT_CHARS =
    'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890!@#$%^&*()_+{}|:"<>?/\\|~`'.split(
        "",
    );

function Notepad() {
    const { text, ref } = useTextAreaContext();

    const insertCharElms = INSERT_CHARS.map((c) => (
        <InsertKey char={c} key={c} />
    ));

    useEffect(() => {
        const elm = ref.current;
        if (elm === null) return;
        elm.focus();
    }, [ref.current]);

    return (
        <section
            className={gc(
                styles.container,
                "win7",
                "absolute inset-0 overflow-hidden flex justify-center items-center",
            )}
        >
            {/* notepad window */}
            <section
                className={gc(
                    "window active",
                    "h-[80%] md:h-[80%] max-w-[90%]  bg-white aspect-video relative flex flex-col",
                )}
            >
                {/*window title bar*/}
                <section className={gc("title-bar", "h-fit")}>
                    <p className="title-bar-text">Notepad</p>
                    <div className="title-bar-controls">
                        <button aria-label="Minimize" type="button"></button>
                        <button aria-label="Maximize" type="button"></button>
                        <button aria-label="Close" type="button"></button>
                    </div>
                </section>
                {/* window body */}
                <section className={gc("window-body", "grow flex flex-col")}>
                    <Menubar>
                        <MenuItem hasPopup={true}>
                            File
                            <Menu>
                                <MenuItem label="" hasPopup={false}>
                                    <a href="https://youtube.com">Save</a>
                                </MenuItem>
                                <MenuItem>Open</MenuItem>
                                <MenuItem>Close</MenuItem>
                            </Menu>
                        </MenuItem>
                        <MenuItem label="Edit">
                            <Menu>
                                <MenuItem label="Insert">
                                    <Menu className="overflow-scroll h-90">
                                        {insertCharElms}
                                    </Menu>
                                </MenuItem>
                                <MenuItem label="Move">
                                    <Menu>
                                        <MoveKey towards="Up" />
                                        <MoveKey towards="Down" />
                                        <MoveKey towards="Left" />
                                        <MoveKey towards="Right" />
                                    </Menu>
                                </MenuItem>

                                <BackspaceKey />
                                <EnterKey />
                                <MenuItem label="Insert"></MenuItem>
                            </Menu>
                        </MenuItem>
                        <MenuItem label="Help"></MenuItem>
                    </Menubar>

                    <textarea
                        value={text}
                        ref={ref}
                        className="resize-none size-full grow"
                        onBeforeInput={(e) => e.preventDefault()}
                        onBlur={(e) => e.target.focus()}
                        onClick={(e) => e.preventDefault()}
                        onDrop={(e) => e.preventDefault()}
                        onPaste={(e) => e.preventDefault()}
                        onKeyDown={(e) => e.preventDefault()}
                    ></textarea>
                </section>
            </section>
        </section>
    );
}

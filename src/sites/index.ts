import React from "react";
import { generateId } from "@/lib";
import type { TSite } from "@/components/Site/types";

// import BirthdaySelector from "./BirthdaySelector";
const BirthdaySelector = React.lazy(() => import("./BirthdayGuesser"));
const TermsOfServiceLoader = React.lazy(() => import("./TermsOfService"));
const Passwordle = React.lazy(() => import("./Passwordle/"));
const QRCodeScanner = React.lazy(() => import("./QRCodeScanner/"));
const EtchACaptcha = React.lazy(() => import("./EtchACaptcha/"));
const Notepad = React.lazy(() => import("./Notepad/"));

const siteInfo: TSite[] = [
    {
        id: generateId(),
        title: "Birthday Guesser",
        description: "Guessing your birthday in \nO(logN) time",
        component: BirthdaySelector,
    },
    {
        id: generateId(),
        title: "Terms of Service",
        description: "We ain't take no liability",
        component: TermsOfServiceLoader,
    },
    {
        id: generateId(),
        title: "Notepad",
        description: "Guessing your birthday in \nO(logN) time",
        component: Notepad,
    },
    {
        id: generateId(),
        title: "Etch-A-Captcha",
        description: "Guessing your birthday in \nO(logN) time",
        component: EtchACaptcha,
    },
    {
        id: generateId(),
        title: "QR Code Scanner",
        description: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
        component: QRCodeScanner,
    },
    {
        id: generateId(),
        title: "Passwordle",
        description: "Six tries at once, Once a day",
        component: Passwordle,
    },
];

export const SiteIndex = new Map<string, TSite>(
    siteInfo.map((s) => [generateId(), s]),
);

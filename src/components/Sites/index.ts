import { generateId } from "@/lib";
import type { TSite } from "../Site/types";

import BirthdaySelector from "./BirthdaySelector";
import TermsOfServiceLoader from "./TermsOfService";
import Passwordle from "./Passwordle/";

const siteInfo: TSite[] = [
    {
        id: generateId(),
        title: "Birthday Selector",
        description: "Binary search your birthday",
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
        title: "Passwordle",
        description: "Six tries at once, Once a day",
        component: Passwordle,
    },
];

export const Sites = new Map<string, TSite>(siteInfo.map((s) => [generateId(), s]));

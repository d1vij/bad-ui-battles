import { generateId } from "@/lib";
import type { TSite } from "../Site/types";
import BirthdaySelector from "./BirthdaySelector";

const siteInfo: TSite[] = [
    {
        id: generateId(),
        title: "Birthday Selector",
        description: "Binary search your birthday",
        component: BirthdaySelector,
    },
];

export const Sites = new Map<string, TSite>(siteInfo.map((s) => [generateId(), s]));

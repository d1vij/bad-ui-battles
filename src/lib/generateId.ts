import { nanoid } from "nanoid";

export function generateId(len?: number) {
    return nanoid(len);
}

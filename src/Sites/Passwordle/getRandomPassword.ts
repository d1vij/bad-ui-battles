import { customAlphabet } from "nanoid";

const generator = customAlphabet("ABCDEFGHIJKLMNOPQRSTUVWXYZ", 10)

export function getRandomPassword(): string {
    // return passwords[Math.floor(Math.random() * passwords.length)];
    return generator()
}

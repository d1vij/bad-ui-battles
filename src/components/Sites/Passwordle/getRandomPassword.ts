const passwords = [
    "PASSWORD"
];

export function getRandomPassword(): string {
    return passwords[Math.floor(Math.random() * passwords.length)];
}

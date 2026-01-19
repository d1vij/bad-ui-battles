const passwords = [
    "SILLYBANANA42",
    "TOASTINSPACE",
    "WOBBLYPENGUIN",
    "GRUMPYMUFFIN",
    "NOODLEWIZARD",
    "SPICYKEYBOARD",
    "SLEEPYOCTOPUS",
    "CONFUSEDTOASTER",
    "HAPPYCACTUS",
    "LOSTSOCKCLUB",
    "DRAMATICPOTATO",
    "COSMICPICKLE",
    "FRIENDLYGOBLIN",
    "ANGRYPINEAPPLE",
    "WANDERINGWAFFLE",
    "BOREDRACCOON",
    "SNEAKYMEATBALL",
    "CHEERFULLOBSTER",
    "MILDLYCHAOTIC",
    "SUSPICIOUSBREAD",
];

export function getRandomPassword(): string {
    return passwords[Math.floor(Math.random() * passwords.length)];
}

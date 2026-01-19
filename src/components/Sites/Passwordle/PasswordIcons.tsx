type IconProps = {
    state: "valid" | "invalid" | "neutral" | "present";
};

function Icon({ state }: IconProps) {
    let color: string;
    let icon: string;
    switch (state) {
        case "valid":
            icon = "✓";
            color = "bg-green-500";
            break;
        case "invalid":
            icon = "⨯";
            color = "bg-red-500";
            break;
        case "present":
            icon = "?";
            color = "bg-yellow-500";
            break;
        case "neutral":
        default:
            icon = "⏺";
            color = "bg-gray-500";
    }
    return (
        <div className={color + " " + "ext-lg flex size-4 items-center justify-center rounded-4xl p-2 select-none"}>
            {icon}
        </div>
    );
}

type PasswordIconsProps = {
    password: string[];
    inputtedPassword: string[];
};

export default function PasswordIcons({ password, inputtedPassword }: PasswordIconsProps) {
    const iconElms = [];

    const passwordLen = password.length;
    const inputtedPasswordLen = inputtedPassword.length;
    const range = inputtedPasswordLen > passwordLen ? passwordLen : inputtedPasswordLen;

    for (let idx = 0; idx < range; idx++) {
        if (password[idx] === inputtedPassword[idx]) {
            iconElms.push(<Icon state="valid" />);
        } else if (password.includes(inputtedPassword[idx])) {
            iconElms.push(<Icon state="present" />);
        } else {
            iconElms.push(<Icon state="neutral" />);
        }
    }

    if (inputtedPasswordLen > passwordLen) {
        for (let idx = 0; idx < inputtedPasswordLen - passwordLen; idx++) {
            iconElms.push(<Icon state="invalid" />);
        }
    }

    return (
        <div className="mt-2 mb-10 flex min-h-4 w-100 gap-0.5 overflow-x-scroll overflow-y-hidden px-3">{iconElms}</div>
    );
}

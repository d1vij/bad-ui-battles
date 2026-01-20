import styles from "./passwordle.module.scss";

type IconProps = {
    state: "valid" | "invalid" | "neutral" | "present";
};

function Icon({ state }: IconProps) {
    let color: string;
    switch (state) {
        case "valid":
            color = "bg-green-500";
            break;
        case "invalid":
            color = "bg-red-500";
            break;
        case "present":
            color = "bg-yellow-500";
            break;
        case "neutral":
        default:
            color = "bg-gray-500";
    }
    return (
        <div
            className={
                color +
                " " +
                styles.passwordIcon +
                " " +
                "ext-lg flex size-4.5 items-center justify-center border-t-2 border-b-2 border-transparent select-none"
            }
        >
            {""}
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
            iconElms.push(<Icon key={idx} state="valid" />);
        } else if (password.includes(inputtedPassword[idx])) {
            iconElms.push(<Icon key={idx} state="present" />);
        } else {
            iconElms.push(<Icon key={idx} state="neutral" />);
        }
    }

    if (inputtedPasswordLen > passwordLen) {
        for (let idx = 0; idx < inputtedPasswordLen - passwordLen; idx++) {
            iconElms.push(<Icon key={idx + passwordLen} state="invalid" />);
        }
    }

    return <div className={"mt-2 mb-10 flex min-h-6 w-[90%] overflow-x-scroll overflow-y-hidden px-3"}>{iconElms}</div>;
}

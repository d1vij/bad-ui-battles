/** biome-ignore-all lint/a11y/noNoninteractiveElementToInteractiveRole: trust me bro */
import { gc } from "@/lib";
import type { PropsWithChildren } from "react";

type MenuItemProps = Partial<PropsWithChildren> & {
    label?: string;
    hasPopup?: boolean;
    hasDivider?: boolean;
};
export function MenuItem({
    children,
    label = "",
    hasPopup = true,
    hasDivider = false,
}: MenuItemProps) {
    return (
        <li
            role="menuitem"
            tabIndex={0}
            aria-haspopup={hasPopup}
            className={gc(hasDivider ? "has-divider" : "")}
        >
            {label}
            {children}
        </li>
    );
}

export function Menubar({ children }: PropsWithChildren) {
    return (
        <ul role="menubar" className="can-hover">
            {children}
        </ul>
    );
}

type MenuProps = PropsWithChildren & {
    className?: string;
};

export function Menu({ children, className = "" }: MenuProps) {
    return (
        <ul role="menu" className={className}>
            {children}
        </ul>
    );
}

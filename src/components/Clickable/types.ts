import type { PropsWithChildren } from "@/types";

export type ClickableProps = PropsWithChildren & {
    handleClick: VoidFunction;
};

import type React from "react";

export type StateSetter<T> = React.Dispatch<React.SetStateAction<T>>;

export type PropsWithSetActiveSite = {
    setActiveSite: StateSetter<string | undefined>;
};

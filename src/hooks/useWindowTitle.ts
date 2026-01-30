import { useEffect, useRef } from "react";

// hook to set the window's title
export function useWindowTitle(title: string) {
    const originalTitle = useRef<string>(null);

    useEffect(() => {
        // storing the original title when component gets mounted
        if (originalTitle.current === null) {
            originalTitle.current = document.title;
        }

        document.title = title;
        return () => {
            // reset back to original when component unmounts
            if (originalTitle.current != null) {
                document.title = originalTitle.current;
            }
        };
    }, [title]);
}

import { useEffect, useRef } from "react";

// hook to set the window's title
export function useWindowTitle(title: string) {
    const orignalRef = useRef<string>(null);
    useEffect(() => {
        // storing the original title when component gets mounted
        if (orignalRef.current === null) {
            orignalRef.current = document.title;
        }

        document.title = title;
        return () => {
            // reset back to original when component unmounts
            if (orignalRef.current != null) {
                document.title = orignalRef.current;
            }
        };
    }, [title]);
}

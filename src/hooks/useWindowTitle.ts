import { useEffect } from "react";

export function useWindowTitle(title: string) {
    useEffect(() => {
        document.title = title;
        console.log("title set");
        return () => {
            document.title = "badUIbattles";
        };
    }, [title]);
}

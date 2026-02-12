// Created 2026-01-17 17:47:06+0530
import "@/styles/App.scss";

import { useEffect, useState } from "react";
import SiteSelection from "@/components/SiteSelection";
import SiteLoader from "@/components/SiteLoader";

import { SiteIndex } from "@/sites";
import { setHash } from "@/lib";

export default function App() {
    const [activeSiteId, setActiveSiteId] = useState<string | undefined>(
        undefined,
    );

    useEffect(() => {
        function hashChangeHandler() {
            const hash = window.location.hash;
            setActiveSiteId(hash === "" ? undefined : hash);
        }
        window.addEventListener("hashchange", hashChangeHandler);

        // put a `/` in url pathname if it doesnt exist
        if (!window.location.pathname.endsWith("/")) {
            window.history.replaceState(
                null,
                "",
                window.location.pathname + "/" + window.location.hash,
            );
        }

        setHash(window.location.hash);
        // trigger hash change for page load
        hashChangeHandler();

        return () => {
            window.removeEventListener("hashchange", hashChangeHandler);
        };
    }, []);

    if (activeSiteId === undefined) {
        return <SiteSelection />;
    } else {
        console.log(activeSiteId);
        const site = SiteIndex.get(activeSiteId.slice(1));
        console.log(site);

        if (site === undefined) {
            return (
                <div className="absolute flex justify-center items-center size-full flex-col">
                    <span className="text-center bg-pop-yellow">
                        ~( ´·︵·` )~
                    </span>
                    <button
                        type="button"
                        className="cursor-pointer hover:underline decoration-2"
                        onClick={() => setHash("")}
                    >
                        Go Back
                    </button>
                </div>
            );
        }
        return <SiteLoader site={site} />;
    }
}

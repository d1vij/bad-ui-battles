import type { SiteLoaderProps } from "./types";

import BackButton from "@/components/BackButton";
import Footer, { SiteFooter, FooterGithubLink } from "@/components/Footer";
import { useWindowTitle } from "@/hooks";
import { Suspense } from "react";

import Placeholder from "@/components/Placeholder";

// provides interface to mount and display any arbitrary component(s) within it
export default function SiteLoader({ site, setActiveSite }: SiteLoaderProps) {
    useWindowTitle(site.title);

    // SiteLoader's background is set to bright red, indicating that the embedded component is not utlizing the full available space
    // this could be prevented by using an absolute wrapper around the loaded component, which acts as the background for it
    return (
        <>
            <BackButton setActiveSite={setActiveSite} />
            <div className="flex h-10 grow flex-col justify-between">
                <div
                    // Lmao idk why h-1 works here
                    className={"border-pop-black relative m-2 mt-4 h-1 grow overflow-clip rounded border-3 bg-red-500"}
                >
                    <Suspense fallback={<Placeholder />}>
                        <site.component />
                    </Suspense>
                </div>
                <Footer>
                    <SiteFooter title={site.title} />
                    <FooterGithubLink />
                </Footer>
            </div>
        </>
    );
}

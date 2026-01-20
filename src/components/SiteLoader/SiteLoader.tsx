import type { SiteLoaderProps } from "./types";

import { Sites } from "@/components/Sites";
import type { TSite } from "@/components/Site";

import BackButton from "@/components/BackButton";
import Footer, { SiteFooter, FooterGithubLink } from "@/components/Footer";

function getSite(id: string): TSite | undefined {
    return Sites.get(id);
}

export default function SiteLoader({ id, setActiveSite }: SiteLoaderProps) {
    const site = getSite(id);

    if (site === undefined) {
        return <div>Component not found</div>;
    }
    return (
        <>
            <BackButton setActiveSite={setActiveSite} />
            <div className="flex h-10 grow flex-col justify-between">
                <div
                    // Lmao idk why h-1 works here
                    className={"border-pop-black relative m-1 mt-4 h-1 grow overflow-clip rounded border-3 bg-red-500"}
                >
                    <site.component />
                </div>
                <Footer>
                    <SiteFooter title={site.title} />
                    <FooterGithubLink />
                </Footer>
            </div>
        </>
    );
}

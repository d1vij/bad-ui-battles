import type { SiteSelectionProps } from "./types";
import Site from "@/components/Site";
import { SiteIndex } from "@/components/Sites";
import Titlebar from "@/components/Titlebar";
import Screw from "@/components/Screw";
import Footer, { FooterCredits, FooterGithubLink } from "@/components/Footer";

export default function SiteSelection({ setActiveSite }: SiteSelectionProps) {
    const siteElms: React.ReactElement[] = [];

    SiteIndex.forEach((s, id) => {
        siteElms.push(<Site {...s} key={id} id={id} setActiveSite={setActiveSite} />);
    });

    return (
        <>
            <Screw className="absolute top-4 right-4" />
            <Titlebar title="bad UI battles" />
            <div className="flex h-full grow flex-col justify-between">
                <div
                    className={
                        "mx-auto mt-0 grid w-[90%] grid-cols-1 gap-4 md:gap-8 pb-18 md:grid-cols-2 lg:w-[80%] lg:grid-cols-3"
                    }
                >
                    {siteElms}
                </div>
                {/*<Screw className="absolute top-4 left-4" />*/}
                {/*<Screw className="absolute right-4 bottom-14 md:bottom-10" />*/}
                {/*<Screw className="absolute bottom-14 left-4 md:bottom-10" />*/}
                <Footer>
                    <FooterCredits />
                    <FooterGithubLink />
                </Footer>
            </div>
        </>
    );
}

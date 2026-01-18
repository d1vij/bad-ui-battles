import type { SiteSelectionProps } from "./types";
import Site from "@/components/Site";
import { Sites } from "@/components/Sites";
import Titlebar from "@/components/Titlebar";
import Screw from "@/components/Screw";
import Footer, { FooterCredits, FooterGithubLink } from "@/components/Footer";

export default function SiteSelection({ setActiveSite }: SiteSelectionProps) {
    const siteElms: React.ReactElement[] = [];

    Sites.forEach((s, id) => {
        siteElms.push(<Site {...s} key={id} id={id} setActiveSite={setActiveSite} />);
    });

    return (
        <>
            <Titlebar title="bad UI battles" />
            <div className={"mx-auto mt-0 mb-12 grid w-[80%] grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3"}>
                {siteElms}
            </div>
            {/*<Screw className="absolute top-4 left-4" />*/}
            <Screw className="absolute top-4 right-4" />
            {/*<Screw className="absolute right-4 bottom-14 md:bottom-10" />*/}
            {/*<Screw className="absolute bottom-14 left-4 md:bottom-10" />*/}
            <Footer>
                <FooterCredits />
                <FooterGithubLink />
            </Footer>
        </>
    );
}

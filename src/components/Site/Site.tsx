import Clickable from "@/components/Clickable";
import type { SiteProps } from "./types";

// site holder for SiteSelection
export default function Site({ description, title, id, setActiveSite }: SiteProps) {
    function handleClick() {
        setActiveSite(id);
    }
    return (
        <Clickable handleClick={handleClick}>
            <div>
                <div className="text-3xl md:text-5xl">{title}</div>
                <div className="text-xl">{description}</div>
            </div>
        </Clickable>
    );
}

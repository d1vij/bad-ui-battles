import Clickable from "@/components/Clickable";
import type { SiteProps } from "./types";
import { setHash } from "@/lib";

// site holder for SiteSelection
export default function Site({ description, title, id }: SiteProps) {
    function handleClick() {
        setHash(id);
    }
    return (
        <Clickable handleClick={handleClick}>
            <div className="px-1">
                <div className="text-3xl md:text-5xl">{title}</div>
                <div className="text-xl wrap-break-word">{description}</div>
            </div>
        </Clickable>
    );
}

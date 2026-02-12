import { setHash } from "@/lib";
import Clickable from "@/components/Clickable";

export default function BackButton() {
    function handleClick() {
        setHash("");
    }
    return (
        <Clickable handleClick={handleClick}>
            <p className="w-fit text-4xl">Back</p>
        </Clickable>
    );
}

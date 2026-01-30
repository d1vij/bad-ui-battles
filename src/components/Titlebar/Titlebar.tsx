import type { TitlebarProps } from "./types";

export default function Titlebar({ title }: TitlebarProps) {
    return (
        <div className="relative">
            <div
                className="font-heading text-pop-yellow text-stroke mx-auto mt-1 mb-3 w-[80%] pt-1 text-center text-6xl
                    font-bold tracking-wide select-none text-shadow-lg md:w-[90%] md:text-7xl"
            >
                {title}
            </div>
        </div>
    );
}

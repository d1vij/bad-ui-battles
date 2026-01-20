import type { TitlebarProps } from "./types";

export default function Titlebar({ title }: TitlebarProps) {
    return (
        <div className="relative">
            <div
                className="font-heading text-pop-yellow text-stroke mx-auto mb-3 md:w-[90%] w-[80%] pt-1 text-center text-6xl mt-1
                    font-bold tracking-wide select-none text-shadow-lg md:text-7xl"
            >
                {title}
            </div>
        </div>
    );
}

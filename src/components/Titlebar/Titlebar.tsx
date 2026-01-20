import type { TitlebarProps } from "./types";

export default function Titlebar({ title }: TitlebarProps) {
    return (
        <div className="relative">
            <div
                className="font-heading text-pop-yellow text-stroke mx-auto mb-3 w-[70%] pt-1 text-center text-5xl
                    font-bold tracking-wide select-none text-shadow-lg md:text-7xl"
            >
                {title}
            </div>
        </div>
    );
}

import type { FooterTypes } from "./types";

export function FooterGithubLink() {
    return (
        <p className="cursor-pointer">
            @
            <a className="hover:underline" href="https://github.com/d1vij/" target="_blank">
                d1vij
            </a>
        </p>
    );
}

export function FooterCredits() {
    return (
        <p className="">
            Inspired by posts from
            <br className="block md:hidden" />
            <a className="ml-2 cursor-help underline" href="https://www.reddit.com/r/badUIbattles/" target="_blank">
                r/badUIbattles
            </a>
        </p>
    );
}

export function SiteFooter({ title }: { title: string }) {
    return <p className="">{title}</p>;
}

export default function Footer({ children }: FooterTypes) {
    return (
        <>
            <div className="mt-auto flex h-fit w-full grid-cols-3 justify-between p-1 text-lg text-zinc-700">
                {children}
            </div>
        </>
    );
}

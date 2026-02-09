import type { FooterTypes } from "./types";

export function FooterGithubLink() {
    return (
        <p className="cursor-pointer">
            @
            <a
                className="hover:underline"
                href="https://github.com/d1vij/"
                target="_blank" rel="noopener"
            >
                d1vij
            </a>
        </p>
    );
}

export function FooterCredits() {
    return (
        <p className="">
            Inspired by posts
            <br className="block md:hidden" />
            from
            <a
                className="ml-2 cursor-help underline"
                href="https://www.reddit.com/r/badUIbattles/"
                target="_blank" rel="noopener"
            >
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
            <footer className="z-20 flex h-fit w-full grid-cols-3 justify-between p-1 text-lg text-zinc-700">
                {children}
            </footer>
        </>
    );
}

import type { PropsWithSetActiveSite } from "@/types";
import type { TSite } from "@/components/Site";

export type SiteLoaderProps = PropsWithSetActiveSite & {
    site: TSite;
};

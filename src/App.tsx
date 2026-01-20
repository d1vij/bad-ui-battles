// Created 2026-01-17 17:47:06+0530
import "./App.scss";

import { useState } from "react";
import SiteSelection from "@/components/SiteSelection";
import SiteLoader from "@/components/SiteLoader";

import { Sites } from "@/components/Sites";

export default function App() {
    const [activeSiteId, setActiveSiteId] = useState<string | undefined>(undefined);

    if (activeSiteId === undefined) {
        return <SiteSelection setActiveSite={setActiveSiteId} />;
    } else {
        const site = Sites.get(activeSiteId);

        if (site === undefined) {
            return <div>Component not found</div>;
        }
        return <SiteLoader site={site} setActiveSite={setActiveSiteId} />;
    }
}

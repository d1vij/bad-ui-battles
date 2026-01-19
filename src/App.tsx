// Created 2026-01-17 17:47:06+0530
import "./App.scss";

import { useState } from "react";
import SiteSelection from "@/components/SiteSelection";
import SiteLoader from "@/components/SiteLoader";

export default function App() {
    const [activeSite, setActiveSite] = useState<string | undefined>(undefined);

    if (activeSite === undefined) {
        return <SiteSelection setActiveSite={setActiveSite} />;
    } else {
        return <SiteLoader id={activeSite} setActiveSite={setActiveSite} />;
    }
}

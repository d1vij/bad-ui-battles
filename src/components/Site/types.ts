type common = {
    id: string;
    title: string;
    description: string;
};
export type TSite = common & {
    component: React.FC;
};

export type SiteProps = common & {
    setActiveSite: React.Dispatch<React.SetStateAction<string | undefined>>;
};

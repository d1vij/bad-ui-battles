export type SiteProps = {
    id: string;
    title: string;
    description: string;
};
export type TSite = SiteProps & {
    component: React.FC;
};
export interface PortfolioEntry {
    id: number;
    title: string;
    description: string;
    image: string | ArrayBuffer | null | undefined;
    customerLink: string;
    hidden: boolean;
}

export enum ViewEntries{
  All,
  Hidden
}
import { PortfolioService } from './portfolio.service';
export declare class PortfolioController {
    private portfolioService;
    constructor(portfolioService: PortfolioService);
    getPortfolioEntries(): any[];
    createPortfolioEntri(entry: any): void;
    UpdateEntry(entry: any): void;
    deletePortfolioEntry(id: number): void;
}

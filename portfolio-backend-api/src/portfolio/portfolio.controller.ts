import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { PortfolioService } from './portfolio.service';

@Controller('portfolio')
export class PortfolioController {
    constructor(private portfolioService: PortfolioService) {}
    
    @Get()
    getPortfolioEntries(): any[] {
        return this.portfolioService.getPortfolioEntries();
    }

    @Post()
    createPortfolioEntri(@Body() entry: any) {
        this.portfolioService.addPortfolioEntry(entry);
    }

    @Put()
    UpdateEntry(@Body() entry: any) {
        this.portfolioService.updatePortfolioEntry(entry);
    }

    @Delete(':id')
    deletePortfolioEntry(@Param('id') id: number) {
        this.portfolioService.deletePortfolioEntry(id);
    }
}

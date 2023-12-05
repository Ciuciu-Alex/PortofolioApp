import { Injectable } from '@angular/core';
import { PortfolioEntry } from '../models/portfolio-entry.model';

@Injectable({
  providedIn: 'root',
})
export class PortfolioService {
  private portfolioEntries: PortfolioEntry[] = [
    {
      id: 1,
      title: "Automation Anywhere",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
      customerLink: "https://www.automationanywhere.com/",
      image: "https://www.cxtoday.com/wp-content/uploads/2021/10/Untitled-346.jpg", 
      hidden: false
    },
    {
      id: 2,
      title: "UiPath",
      description: "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
      customerLink: "https://www.uipath.com/",
      image: "https://images.ctfassets.net/5965pury2lcm/6UkIAgbpiY03pfTodnNigs/9f5dc0d2d407b14a6b1bc951bd877ea4/Discover.jpg", 
      hidden: false
    },
    {
      id: 3,
      title: "Blue Prism",
      description: "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
      customerLink: "https://www.blueprism.com/",
      image: "https://files.blueprism.com/uploads/images/finance-accounting_2023-01-10-145913_vdmo.webp", 
      hidden: false
    }
  ];

  getPortfolioEntries(): PortfolioEntry[] {
    return this.portfolioEntries;
  }

  addPortfolioEntry(entry: PortfolioEntry): void {
    this.portfolioEntries.push(entry);
  }

  updatePortfolioEntry(entry: PortfolioEntry): void {
    let index = this.portfolioEntries.findIndex((e) => e.id == entry.id);
    if (index != -1) {
        this.portfolioEntries[index] = entry;
    }
  }

  deletePortfolioEntry(id: number): void {
    let indexToDeleteEntry = this.portfolioEntries.findIndex((e) => e.id == id);

    if (indexToDeleteEntry > -1) {
      this.portfolioEntries.splice(indexToDeleteEntry, 1);
    }
  }
}
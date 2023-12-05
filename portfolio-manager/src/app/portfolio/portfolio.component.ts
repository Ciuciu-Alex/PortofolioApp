import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';

import { PortfolioEntry, ViewEntries } from '../models/portfolio-entry.model';
import { PortfolioService } from '../services/portfolio.service';
import {AddPortfolioEntryComponent } from '../add-portfolio-entry/add-portfolio-entry.component';

@Component({
  selector: 'app-portfolio',
  standalone: true,
  imports: [CommonModule, FormsModule,MatIconModule, MatSelectModule, MatButtonModule, MatCheckboxModule, MatCardModule, MatInputModule,MatListModule,
    MatGridListModule, MatButtonToggleModule, MatDialogModule],
  templateUrl: './portfolio.component.html',
  styleUrl: './portfolio.component.scss',
})
export class PortfolioComponent {

  portfolioEntries: PortfolioEntry[] = [];
  viewPortfolioEntries: PortfolioEntry[] = [];
  viewEntries = ViewEntries;
  defaultViewEntries: ViewEntries = ViewEntries.All;
  viewEntriesOption: boolean = true;

  constructor(
    private portfolioService: PortfolioService, 
    private dialog: MatDialog
    ) 
  {
    this.portfolioEntries = this.portfolioService.getPortfolioEntries();
    this.viewPortfolioEntries = this.portfolioEntries.filter(entry => !entry.hidden);
  }

  addEntry(): void {
    const dialogRef = this.dialog.open(AddPortfolioEntryComponent, {
      width: '600px',
      height: '450px',
      data: {numberOfPortfolioEntries: this.portfolioEntries.length}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.portfolioService.addPortfolioEntry(result.entry);
        this.viewAllEntries(this.defaultViewEntries);
      }
    });
  }

  hideEntry(entry: PortfolioEntry) {
    this.portfolioService.updatePortfolioEntry(entry);
  }

  updateEntry(entry: PortfolioEntry){
    const dialogRef = this.dialog.open(AddPortfolioEntryComponent, {
      width: '600px',
      height: '450px',
      data: {numberOfPortfolioEntries: this.portfolioEntries.length, entryToUpdate: entry}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.portfolioService.updatePortfolioEntry(result.entry);
        this.viewAllEntries(this.defaultViewEntries);
      }
    });
  }

  deleteEntry(id: number): void {
    this.portfolioService.deletePortfolioEntry(id);
    this.viewAllEntries(this.defaultViewEntries);
  }

  viewAllEntries(value: ViewEntries): void {
    const allEntries = this.portfolioService.getPortfolioEntries();

    if (value == ViewEntries.Hidden) {
      this.viewPortfolioEntries = allEntries.filter(entry => entry.hidden);
      return;
    }
    this.viewPortfolioEntries = allEntries.filter(entry => !entry.hidden);
  }
}

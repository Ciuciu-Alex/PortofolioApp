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
import { AddPortfolioEntryComponent } from '../add-portfolio-entry/add-portfolio-entry.component';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-portfolio',
  standalone: true,
  imports: [CommonModule, FormsModule, MatIconModule, MatSelectModule, MatButtonModule, MatCheckboxModule, MatCardModule, MatInputModule,MatListModule,
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
    private dialog: MatDialog,
    private http: HttpClient
    ) 
  {
    this.loadAllEntries();
    this.viewPortfolioEntries = this.portfolioEntries.filter(entry => !entry.hidden);
  }

  loadAllEntries(){
    this.http.get<PortfolioEntry[]>('http://localhost:3000/portfolio').subscribe(
    (data: PortfolioEntry[]) => {
      this.portfolioEntries = data;
    },
    (error) => {
      console.error('Error fetching portfolio data:', error);
    });
  }

  addEntry(): void {
    const dialogRef = this.dialog.open(AddPortfolioEntryComponent, {
      width: '600px',
      height: '450px',
      data: {numberOfPortfolioEntries: this.portfolioEntries.length}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.http.post('http://localhost:3000/portfolio', result.entry).subscribe(() => {
          this.loadAllEntries();
          this.viewAllEntries(this.defaultViewEntries);
        }, (error) => {
          console.log(error);
        });;
      }
    }, (error) => {
      console.log(error);
    });;
  }

  hideEntry(entry: PortfolioEntry) {
    this.http.put('http://localhost:3000/portfolio', entry).subscribe(() => {
      this.viewAllEntries(this.defaultViewEntries);
    }, (error) => {
      console.log(error);
    });
  }

  updateEntry(entry: PortfolioEntry){
    const dialogRef = this.dialog.open(AddPortfolioEntryComponent, {
      width: '600px',
      height: '450px',
      data: {numberOfPortfolioEntries: this.portfolioEntries.length, entryToUpdate: entry}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.http.put('http://localhost:3000/portfolio', result.entry).subscribe(()=> {
          this.loadAllEntries();
        }, (error) => {
          console.log(error);
        });
        this.viewAllEntries(this.defaultViewEntries);
      }
    });
  }

  deleteEntry(id: number): void {
    this.http.delete(`http://localhost:3000/portfolio/${id}`).subscribe(() => {
      this.loadAllEntries();
      this.viewAllEntries(this.defaultViewEntries);
    }, (error) => {
      console.log(error);
    });
  }

  viewAllEntries(value: ViewEntries): void {
    this.http.get<PortfolioEntry[]>('http://localhost:3000/portfolio').subscribe((entries: PortfolioEntry[]) => {
      const allEntries = entries;
      if (value == ViewEntries.Hidden) {
        this.viewPortfolioEntries = allEntries.filter((entry: PortfolioEntry) => entry.hidden);
        return;
      }
      this.viewPortfolioEntries = allEntries.filter((entry: PortfolioEntry)  => !entry.hidden);
    }, (error) => {
      console.log(error);
    });
  }
}

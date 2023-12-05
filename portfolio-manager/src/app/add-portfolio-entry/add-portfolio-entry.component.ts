import { Component, Inject  } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';

import { PortfolioEntry } from '../models/portfolio-entry.model';

@Component({
  selector: 'app-add-portfolio-entry',
  standalone: true,
  imports: [CommonModule, FormsModule, MatButtonModule, MatCheckboxModule, MatFormFieldModule, MatInputModule],
  templateUrl: './add-portfolio-entry.component.html',
  styleUrl: './add-portfolio-entry.component.scss'
})
export class AddPortfolioEntryComponent {
  numberOfPortfolioEntries!: number;
  entry: PortfolioEntry = this.initEntry();
  selectedFile: File | null = null;
  selectedFileUrl: string | ArrayBuffer | null | undefined = null;
  canSave: boolean = false;

  constructor(
    public dialogRef: MatDialogRef<AddPortfolioEntryComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.numberOfPortfolioEntries = data.numberOfPortfolioEntries;
    this.entry = data.entryToUpdate != undefined ?
      Object.assign(this.entry, data.entryToUpdate): 
      this.initEntry();
      this.selectedFileUrl = this.entry.image;
  }

  onFileSelected(event: any): void {
    const file: File = event.target.files[0];

    if (file) {
      this.selectedFile = file;
      const reader = new FileReader();
      reader.onload = (e) => {
        this.selectedFileUrl = e.target?.result;
        this.entry.image = this.selectedFileUrl;
      };
      reader.readAsDataURL(file);
    }
  }

  saveEntry(): void {
    if (!this.validateForm(this.entry)) {
      return;
    }
    this.dialogRef.close({ entry: this.entry});
    this.entry = this.initEntry();
  }

  validateForm(entry: PortfolioEntry): boolean {
    return entry.title !== '' && entry.description != '' && entry.customerLink != '';
  }

  initEntry(): PortfolioEntry {
    return {
      id: this.numberOfPortfolioEntries + 1,
      title:'',
      description: '',
      customerLink: '',
      image: '',
      hidden: false,
    }
  }
}

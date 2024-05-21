import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-lose-dialog',
  standalone: true,
  imports: [],
  templateUrl: './lose-dialog.component.html',
  styleUrl: './lose-dialog.component.css',
})
export class LoseDialogComponent {
  constructor(public dialogRef: MatDialog) {}

  onRetry(): void {
    this.dialogRef.closeAll();
  }
}

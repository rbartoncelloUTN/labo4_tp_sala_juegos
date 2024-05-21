import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-win-dialog',
  standalone: true,
  imports: [],
  templateUrl: './win-dialog.component.html',
  styleUrl: './win-dialog.component.css'
})
export class WinDialogComponent {
  constructor(public dialogRef: MatDialog) {}

  nextWord(): void {
    this.dialogRef.closeAll();
  }
}

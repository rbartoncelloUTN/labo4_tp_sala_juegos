import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { WinDialogComponent } from '../win-dialog/win-dialog.component';
import { LoseDialogComponent } from '../lose-dialog/lose-dialog.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-my-game',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './my-game.component.html',
  styleUrl: './my-game.component.css',
})
export class MyGameComponent {
  answers = [14, 25, -20];
  curentGame = 0;
  fruits = [
    '../../../assets/images/fruits/apple.jpg',
    '../../../assets/images/fruits/banana.jpg',
    '../../../assets/images/fruits/grape.jpg',
  ];
  answersGames = [
    [30, 20, 12],
    [60, 40, 20],
    [-90, 10, 0],
  ];
  options = [
    [13, 14, 15],
    [25, 26, 27],
    [-18, -19, -20],
  ];

  constructor(public dialog: MatDialog) {}

  handleOnClick(id: number): void {
    if (this.options[this.curentGame][id] === this.answers[this.curentGame]) {
      this.curentGame += 1;
      if (this.curentGame === 3) {
        this.openWinDialog();
      }
    } else {
      this.openLoseDialog();
    }
  }

  openLoseDialog() {
    const dialogRef = this.dialog.open(LoseDialogComponent);
    this.resetGame();

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.resetGame();
      }
    });
  }

  openWinDialog() {
    const dialogRef = this.dialog.open(WinDialogComponent);
    this.resetGame();

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.resetGame();
      }
    });
  }

  resetGame() {
    this.curentGame = 0;
  }
}

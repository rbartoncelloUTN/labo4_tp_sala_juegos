import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { LoseDialogComponent } from '../lose-dialog/lose-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { WinDialogComponent } from '../win-dialog/win-dialog.component';

const words = ['Messi', 'Leo', 'Mateo', 'Barcelona', 'PSG'];

interface Letter {
  id: number;
  letter: string;
  clicked: boolean;
}

@Component({
  selector: 'app-hanged',
  standalone: true,
  imports: [MatButtonModule, CommonModule, FormsModule],
  templateUrl: './hanged.component.html',
  styleUrl: './hanged.component.css',
})
export class HangedComponent implements OnInit {
  letters: Letter[] = [];
  lives: number = 6;
  hanged_image_path: string = `assets/images/el-ahorcado-${7 - this.lives}.jpg`;
  word_game: string = '';
  word: string = '';

  constructor(public dialog: MatDialog) {}

  ngOnInit(): void {
    this.initializeLetters();
    const randomNumber = Math.random();
    const randomIndex = Math.floor(randomNumber * words.length);
    this.word_game = words[randomIndex];
    this.initializeWord();
  }
  initializeWord(): void {
    const gameChars = Array.from(this.word_game);
    this.word = '';
    this.word = gameChars.map((char) => '-').join('');
  }

  initializeLetters(): void {
    const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    for (let i = 0; i < alphabet.length; i++) {
      const letter: Letter = {
        id: i + 1,
        letter: alphabet[i],
        clicked: false,
      };
      this.letters.push(letter);
    }
  }

  handleOnClickLetter(index: number) {
    const letter = this.letters[index];
    letter.clicked = true;

    const matchingPositions: number[] = this.getIndexMatchingWord(
      letter.letter
    );
    if (matchingPositions.length == 0) {
      this.lives--;
      if (this.lives == 0) {
        this.openLoseDialog();
      } else {
        this.hanged_image_path = `assets/images/el-ahorcado-${
          7 - this.lives
        }.jpg`;
      }

      console.log(this.lives, this.hanged_image_path);
    } else {
      this.updateWordWithMatches(matchingPositions, letter);
      if (this.word.toLowerCase() === this.word_game.toLowerCase()) {
        this.openWinDialog();
      }
    }
  }

  getIndexMatchingWord(word: string): number[] {
    const matchingPositions: number[] = [];
    for (let i = 0; i < this.word_game.length; i++) {
      if (this.word_game[i].toLowerCase() === word.toLowerCase()) {
        matchingPositions.push(i);
      }
    }
    return matchingPositions;
  }
  updateWordWithMatches(matchingPositions: number[], letter: Letter): void {
    const gameChars = Array.from(this.word);
    for (let i = 0; i < matchingPositions.length; i++) {
      gameChars[matchingPositions[i]] = letter.letter;
    }
    this.word = gameChars.join('');
  }

  openLoseDialog() {
    const dialogRef = this.dialog.open(LoseDialogComponent);
    this.resetGame();
    this.letters = this.letters.map((letter) => ({
      ...letter,
      clicked: false,
    }));
    this.initializeWord();

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.resetGame();
      }
    });
  }

  openWinDialog() {
    const dialogRef = this.dialog.open(WinDialogComponent);
    const randomNumber = Math.random();
    const randomIndex = Math.floor(randomNumber * words.length);
    this.word_game = words[randomIndex];
    this.resetGame();
    this.letters = this.letters.map((letter) => ({
      ...letter,
      clicked: false,
    }));
    this.initializeWord();

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.resetGame();
      }
    });
  }

  resetGame() {
    this.lives = 6;
    this.hanged_image_path = `assets/images/el-ahorcado-${1}.jpg`;
  }
}

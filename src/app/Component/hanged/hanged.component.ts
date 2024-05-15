import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';

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
  word_game: string = 'MESSI';
  word: string = '';

  ngOnInit(): void {
    this.initializeLetters();
    this.initializeWord();
  }
  initializeWord(): void {
    const gameChars = Array.from(this.word_game);
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
      this.hanged_image_path = `assets/images/el-ahorcado-${
        7 - this.lives
      }.jpg`;
    } else {
      this.updateWordWithMatches(matchingPositions, letter);
    }
  }

  getIndexMatchingWord(word: string): number[] {
    const matchingPositions: number[] = [];
    for (let i = 0; i < this.word_game.length; i++) {
      if (this.word_game[i] === word) {
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
}

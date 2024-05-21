import { Component, OnInit } from '@angular/core';
import { CountryService } from '../../services/Country/country.service';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Country } from './intefaces';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { LoseDialogComponent } from '../lose-dialog/lose-dialog.component';

const shuffleArray = <T>(array: T[]): T[] => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

@Component({
  selector: 'app-country-game',
  standalone: true,
  imports: [RouterOutlet, CommonModule],
  templateUrl: './country-game.component.html',
  styleUrl: './country-game.component.css',
})
export class CountryGameComponent implements OnInit {
  public countries!: Country[];
  public pounts: number = 0;
  public lives: number = 3;

  constructor(
    private countryService: CountryService,
    private _snackBar: MatSnackBar,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.countryService.getCountries().subscribe((countries) => {
      this.countries = shuffleArray(countries);
    });
  }

  getRandomCountryName(): string {
    const randomIndex = Math.floor(Math.random() * this.countries.length);
    return this.countries[randomIndex].name;
  }

  getRandomCountry(): Country {
    const randomIndex = Math.floor(Math.random() * this.countries.length);
    return this.countries[randomIndex];
  }

  getOptions() {
    let countries = [
      { ...this.countries[this.countries.length - 1], isAnwer: true },
    ];
    for (let i = 0; i < 3; i++) {
      countries.push({ ...this.getRandomCountry(), isAnwer: false });
    }
    return shuffleArray(countries);
  }

  onCountryButtonClick(country: Country) {
    this.countries.pop();

    if (country.isAnwer) {
      this.pounts++;
      this._snackBar.open('Acertaste', 'Ocultar', {
        duration: 2000,
        panelClass: ['snackbar-success'],
      });
    } else {
      this.lives--;
      if (this.lives === 0) {
        this.openLoseDialog();
      } else {
        this._snackBar.open('Perdiste', 'Ocultar', {
          duration: 2000,
          panelClass: ['snackbar-error'],
        });
      }
    }
  }

  openLoseDialog() {
    const dialogRef = this.dialog.open(LoseDialogComponent);

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.resetGame();
      }
    });
  }

  resetGame() {
    this.lives = 3;
  }
}

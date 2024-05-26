import { Component, OnInit } from '@angular/core';
import { CardsService } from '../../services/CardService/cards-service.service';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Card, CardAPI } from '../../services/CardService/interfaces';
import { CardComponent } from '../card/card.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { LoseDialogComponent } from '../lose-dialog/lose-dialog.component';

@Component({
  selector: 'app-cards-game',
  standalone: true,
  imports: [RouterOutlet, CommonModule, HttpClientModule, CardComponent],
  templateUrl: './cards-game.component.html',
  styleUrl: './cards-game.component.css',
})
export class CardsGameComponent implements OnInit {
  public cards!: Card[];
  private apiUrl = 'https://deckofcardsapi.com/api/deck/new/draw/?count=52';
  public pounts: number = 0;

  constructor(
    private http: HttpClient,
    private _snackBar: MatSnackBar,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.getCards();
  }

  getCards(): void {
    this.http.get<CardAPI>(this.apiUrl).subscribe((response) => {
      this.cards = response.cards.map((card) => {
        let cardUpload = card;
        switch (card.value) {
          case 'JACK':
            cardUpload = { ...card, value: '11' };
            break;
          case 'QUEEN':
            cardUpload = { ...card, value: '11' };
            break;
          case 'KING':
            cardUpload = { ...card, value: '13' };
            break;
          case 'ACE':
            cardUpload = { ...card, value: '1' };
            break;
        }

        return cardUpload;
      });
    });
  }

  handleOnCardClick(): void {
    console.log('click');
    //this.cards.pop();
  }

  handleOnClickMinorButton(): void {
    console.log('click');
    const lastCard = this.cards.pop();
    const currentCard = this.cards[this.cards.length - 1];

    let messaje = '0 Puntos';

    if (Number(currentCard.value) < Number(lastCard?.value)) {
      this.pounts += 1;
      messaje = `${this.pounts} Puntos`;
    } else if (Number(currentCard.value) > Number(lastCard?.value)) {
      this.pounts -= 1;
      messaje = `${this.pounts} Puntos`;
    }
    if (this.pounts < 1) {
      messaje = 'Perdiste';
      this.openLoseDialog();
    }

    this._snackBar.open(messaje, 'Ocultar');
  }

  handleOnClickMayorButton(): void {
    console.log('click');
    const lastCard = this.cards.pop();
    const currentCard = this.cards[this.cards.length - 1];
    let messaje = '0 pounts';

    if (Number(currentCard.value) > Number(lastCard?.value)) {
      this.pounts += 1;
      messaje = `${this.pounts} Puntos`;
    } else if (Number(currentCard.value) < Number(lastCard?.value)) {
      this.pounts -= 1;
      messaje = `${this.pounts} Puntos`;
    }
    if (this.pounts < 1) {
      messaje = 'Perdiste';
      this.openLoseDialog();
    }

    this._snackBar.open(messaje, 'Ocultar');
  }

  openLoseDialog() {
    const dialogRef = this.dialog.open(LoseDialogComponent);
    this.getCards();

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.getCards();
      }
    });
  }
}

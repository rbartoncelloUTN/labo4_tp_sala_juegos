import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CardAPI } from './interfaces';

@Injectable({
  providedIn: 'root',
})
export class CardsService {
  //http = inject(HttpClient);
  private apiUrl = 'https://deckofcardsapi.com/api/deck/new/draw/?count=52';

  constructor(private http: HttpClient) {}

  getCard() {
    return this.http.get<CardAPI>(this.apiUrl);
  }
}

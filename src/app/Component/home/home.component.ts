import { Component } from '@angular/core';
import { CardComponent } from '../card/card.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CardComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  path!: string;

  constructor(private router: Router) {}

  test(path?: string) {
    console.log(path);
    this.router.navigate([path]);
  }
}

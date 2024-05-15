import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [MatCardModule],
  templateUrl: './card.component.html',
  styleUrl: './card.component.css',
})
export class CardComponent {
  @Input() path!: string;
  @Output() onClick = new EventEmitter<any>();
  test() {
    console.log(this.path);
    this.onClick.emit(this.path);
  }
}

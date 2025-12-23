import { Component, Input } from '@angular/core';
import { CardBook } from '../../interface/card-book.interface';

@Component({
  selector: 'app-card-book',
  templateUrl: './card-book.component.html',
  styleUrl: './card-book.component.css',
})
export class CardBookComponent {
  @Input() book!: CardBook;

  get starsArray(): number[] {
    const value = Math.min(Math.max(this.book.rating, 0), 5);
    return Array(value).fill(0);
  }
}

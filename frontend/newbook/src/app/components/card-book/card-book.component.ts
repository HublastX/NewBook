import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-card-book',
  templateUrl: './card-book.component.html',
  styleUrl: './card-book.component.css'
})
export class CardBookComponent {
  
  @Input() title: string = '';
  @Input() author: string = '';
  @Input() category: string = '';
  @Input() synopsis: string = '';
  @Input() likes: number = 0;

  private _stars = 0;

  @Input() 
  set stars(value: number) {
    this._stars = Math.min(Math.max(value, 0), 5); // garante 0–5
  }
  get stars(): number {
    return this._stars;
  }

  @Input() status: string = 'Disponível';

  get starsArray(): number[] {
    return Array(this._stars).fill(0);
  }
}

import { Component } from '@angular/core';
import { CardBook } from '../../../interface/card-book.interface';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrl: './main.component.css',
})
export class MainComponent {
  bookExample: CardBook[] = [
    {
      title: 'O Hobbit',
      author: 'J.R.R. Tolkien',
      category: 'Fantasia',
      synopsis: 'Bilbo embarca em uma aventura inesperada...',
      likes: 1200,
      stars: 5,
      status: 'Disponível',
    },
    {
      title: '1984',
      author: 'George Orwell',
      category: 'Distopia',
      synopsis: 'Um clássico sobre vigilância e controle social...',
      likes: 900,
      stars: 4,
      status: 'Raro',
    },
    {
      title: 'Dom Quixote',
      author: 'Miguel de Cervantes',
      category: 'Romance',
      synopsis: 'As aventuras do cavaleiro da triste figura...',
      likes: 700,
      stars: 5,
      status: 'Disponível',
    },
  ];
}

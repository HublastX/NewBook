import { Component } from '@angular/core';
import { CardBook } from '../../../shared/interface/card-book.interface';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrl: './main.component.css',
})
export class MainComponent {
  bookExample: CardBook[] = [
    {
      bookTitle: 'O Hobbit',
      bookAuthor: 'J.R.R. Tolkien',
      category: 'Fantasia',
      content: 'Bilbo embarca em uma aventura inesperada...',
      rating: 5,
      userName: 'Ana Silva',
      userInitials: 'AS',
      likes: 312,
      comments: 45,
    },
    {
      bookTitle: '1984',
      bookAuthor: 'George Orwell',
      category: 'Distopia',
      content: 'Um clássico sobre vigilância e controle social...',
      rating: 4,
      userName: 'Carlos Lima',
      userInitials: 'CL',
      likes: 210,
      comments: 30,
    },
  ];
}

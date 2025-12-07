export interface CardBook {
  title: string;
  author: string;
  category: string;
  synopsis: string;
  likes: number;
  stars: number;   // entre 0 e 5
  status: string;  // ex: 'Disponível'
}

export interface CardBook {
  bookTitle: string;
  bookAuthor: string;
  category: string;
  content: string;

  rating: number;        // 0 a 5
  ratingText?: string;   // ex: "5.0"

  userName: string;
  userInitials: string;

  likes: number;
  comments: number;
}


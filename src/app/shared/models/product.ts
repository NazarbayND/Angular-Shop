export interface Product {
  title: string;
  price: number;
  category: string;
  imageUrl: string;
  key: string;
  description?: string;
}

export interface UserComment {
  username: string;
  text: string;
  date: number;
}

export interface BookInterface {
  title: string;
  author: string;
  price: number;
  description: string;
  quantity: number;
  inStock: boolean;
  category: "Fiction" | "Science" | "SelfDevelopment" | "Poetry" | "Religious";
  isDeleted?: boolean;
}

export  interface ProductType{
  name: string;
  price: number;
  description: string;
  imageUrl?: string | "https://via.placeholder.com/150";
  stock: number;
}

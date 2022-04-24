export interface SignupInterface {
  name: string;
  email: string;
  password: string;
  favouriteCars: string[];
  cart: string[];
}

export interface CarDataInterface {
  _id?: string;
  sellerId: string;
  sellStatus: boolean;
  address: string;
  brand: string;
  description: string;
  fuel: string;
  imageUrl: string;
  mobileNo: number;
  model: string;
  price: number;
  run: number;
  sellerName: string;
  type: string;
  year: number;
}

export interface CarModel {
  imageUrl: any[];
  year: number;
  price: number;
  brand: string;
  model: string;
  type: string;
  run: number;
  fuel: string;
  _id: string;
  favourite: boolean;
  cart?: boolean;
  removeCart?: boolean;
  sellerId?: string;
  setUpdate?: (update: boolean) => void;
  handlePopup?: () => void;
}

export interface BoughtCar {
  brand: string;
  model: string;
  fuel: string;
  year: number;
  type: string;
  run: number;
  price: number;
  state: string;
  _id?: string;
  sellStatus?: boolean;
  handleEdit?: (price: number) => void;
}

export interface PopupModel {
  open: boolean;
  handleClose: () => void;
  data: JSX.Element;
  heading: string;
}

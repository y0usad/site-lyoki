import { z } from "zod";

export type ProductType = {
  id: string | number;
  name: string;
  shortDescription: string;
  description: string;
  price: number;
  sizes: string[];
  colors: string[];
  images: Record<string, string>;
};

export type ProductsType = ProductType[]

export type CartItemType = ProductType & {
  quantity: number;
  selectedSize: string;
  selectedColor: string;
};
export type CartItemsType = CartItemType[];

export const shippingFormSchema = z.object({
  name:z.string().min(1,"Name is required!"),
  email:z.email().min(1,"Email is required!"),
  phone:z.string().min(11,"Phone number mut be at least 11 digits!").max(11,"Phone number mut be at least 11 digits!").regex(/^[0-9]+$/,"Phone number must contain only digits!"),
  address:z.string().min(1,"Address is required!"),
  city:z.string().min(1,"City is required!"),
});

export type ShippingFormInputs = z.infer<typeof shippingFormSchema>;

export const PaymentFormSchema = z.object({
  cardHolder:z.string().min(1,"Card holder is required!"),
  cardNumber:z.string().min(16,"Email is required!").max(16,"Email is required!"),
  expirationDate: z
  .string()
  .regex(/^(0[1-9]|1[0-2])\/\d{2}$/, "Expiration date must be in MM/YY format!"),
  cvv:z.string().min(3,"CVV must be at least 3 digits!").max(3,"CVV must be at most 3 digits!"),
});

export type PaymentFormInputs = z.infer<typeof PaymentFormSchema>;

export type CartStoreStateType = {
  cart: CartItemsType;
  hasHydrated: boolean;
}

export type CartStoreActionsType = {
  addToCart: (product:CartItemType)=> void;
  removeFromCart: (product:CartItemType) => void;
  clearCart: () => void;
  
}
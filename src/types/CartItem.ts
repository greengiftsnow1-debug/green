import { Plant } from './Plant';

export type CartItem = Plant & {
  quantity: number;
};

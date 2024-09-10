import {ProductType} from './productType';

export interface CartItemType extends ProductType {
  quantity: number;

}

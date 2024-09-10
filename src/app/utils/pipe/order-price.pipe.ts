import { Pipe, PipeTransform } from '@angular/core';
import {ProductType} from "../productType";

@Pipe({
  name: 'orderPrice',
  standalone: true
})
export class OrderPricePipe implements PipeTransform {

  transform(value: ProductType[], order: 'asc' | 'desc'): ProductType[] {
    if (!value){
      return value;
    }
    return [...value].sort((a,b) => {
      if (order === 'asc'){
        return a.price - b.price;
      } else {
        return b.price - a.price;
      }
    }) ;
  }

}

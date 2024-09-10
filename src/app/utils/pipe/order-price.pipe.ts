import { Pipe, PipeTransform } from '@angular/core';
import {ProductType} from "../productType";

@Pipe({
  name: 'orderPrice',
  standalone: true
})
export class OrderPricePipe implements PipeTransform {

  transform(value: ProductType[], order: 'asc' | 'desc', search: string): ProductType[] {
    const filteredName = value.filter(p => p.name.toLowerCase().includes(search.toLowerCase()))
    return filteredName.sort((a,b) => {
      if (order === 'asc'){
        return a.price - b.price;
      } else {
        return b.price - a.price;
      }
    }) ;
  }

}

import { Pipe, PipeTransform } from '@angular/core';
import {Review} from "./details-page/details-page.component";

@Pipe({
  name: 'mostRecentFirst'
})
export class MostRecentFirstPipe implements PipeTransform {
  private compare(a: Review, b: Review) {
    const A = a.date;
    const B = b.date;

    let comparison  = 1;
    if (A > B)
      comparison = -1
    return comparison
  }

  transform(reviews: Review[]): Review[] | null {
    if (reviews.length > 0)
      return reviews.sort(this.compare);
    return null;
  }

}

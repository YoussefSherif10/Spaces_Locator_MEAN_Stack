import {Component, Input} from '@angular/core';
import {Review} from "../details-page/details-page.component";
import {SpacesDataService} from "../spaces-data.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-reviews',
  templateUrl: '/reviews.component.html',
  styles: [
  ]
})
export class ReviewsComponent {
  @Input() reviews!: Review[];
}

import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Review} from "../details-page/details-page.component";
import {SpacesDataService} from "../spaces-data.service";

@Component({
  selector: 'app-review',
  templateUrl: '/review.component.html',
  styles: [
  ]
})
export class ReviewComponent {
  @Input() review!: Review;
}

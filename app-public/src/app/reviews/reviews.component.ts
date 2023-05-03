import {ChangeDetectionStrategy, Component, Input} from '@angular/core';
import {Review} from "../details-page/details-page.component";

@Component({
  selector: 'app-reviews',
  templateUrl: '/reviews.component.html',
  styles: [],
})
export class ReviewsComponent {
  @Input() reviews!: Review[];
  @Input() locationId!: string;
}

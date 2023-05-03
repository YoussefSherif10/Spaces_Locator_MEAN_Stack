import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Review} from "../details-page/details-page.component";
import {DeleteReviewService} from "../delete-review.service";

@Component({
  selector: 'app-review',
  templateUrl: '/review.component.html',
  styles: [
  ]
})
export class ReviewComponent {
  @Input() review!: Review;
  @Input() locationId!: string;

  constructor(private deleteEvent: DeleteReviewService) {
  }

  onClick(id: string) {
    this.deleteEvent.sendMessage('clicked', this.locationId, id);
    this.deleteEvent.clearMessage();
  }

}

import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Review} from "../details-page/details-page.component";

@Component({
  selector: 'app-reviews',
  templateUrl: '/reviews.component.html',
  styles: [],
})
export class ReviewsComponent {
  @Input() reviews!: Review[];
  @Input() locationId!: string;
  @Output() handleSubmit = new EventEmitter();
  formVisible: boolean = false;
  formError: string = '';

  newReview = {
    name: '',
    rating: 5,
    review: ''
  }

  resetAndHide() {
    this.newReview.review = '';
    this.newReview.name = '';
    this.newReview.rating = 5;
    this.formVisible = false;
    this.formError = '';
  }

  formIsValid(): boolean {
    return !!(this.newReview.name && this.newReview.review && this.newReview.rating);
  }

  onSubmit() {
    if (this.formIsValid()) {
      this.handleSubmit.emit(this.newReview);
      this.resetAndHide();
    }
    else
      this.formError = 'All fields are required, please try again';
  }
}

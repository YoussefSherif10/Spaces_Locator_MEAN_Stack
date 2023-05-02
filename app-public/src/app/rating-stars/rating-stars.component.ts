import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-rating-stars',
  templateUrl: '/rating-stars.component.html',
  styles: [
  ]
})
export class RatingStarsComponent {
  @Input() rating!: number;
}

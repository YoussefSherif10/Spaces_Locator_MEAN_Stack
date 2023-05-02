import {Component, Input} from '@angular/core';
import {Location} from "../home-list/home-list.component";

@Component({
  selector: 'app-home-list-item',
  templateUrl: '/home-list-item.component.html',
  styles: [
  ]
})
export class HomeListItemComponent {
  @Input() location!: Location;
}

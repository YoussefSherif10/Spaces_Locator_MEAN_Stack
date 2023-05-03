import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {SpacesDataService} from "../spaces-data.service";
import {Subscription} from "rxjs";
import {Location} from "../homepage/homepage.component";

@Component({
  selector: 'app-home-list',
  templateUrl: '/home-list.component.html',
  styles: [
  ]
})
export class HomeListComponent {
  @Input() locations!: Location[];

}

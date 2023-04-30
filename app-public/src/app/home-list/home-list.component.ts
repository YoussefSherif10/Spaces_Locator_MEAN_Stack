import {Component, OnDestroy, OnInit} from '@angular/core';
import {SpacesDataService} from "../spaces-data.service";
import {Subscription} from "rxjs";

export class Location {
  constructor(
      public _id:string,
      public name:string,
      public distance:number,
      public address:string,
      public rating:number,
      public facilities:string[],
  ) {
  }
}

@Component({
  selector: 'app-home-list',
  templateUrl: '/home-list.component.html',
  styles: [
  ]
})
export class HomeListComponent implements OnInit, OnDestroy {
  locations!: Location[];
  subscription!: Subscription;

  constructor(private data: SpacesDataService) {
  }

  ngOnInit() {
    this.subscription = this.data.getLocations().subscribe(data => {
      this.locations = data;
    })
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}

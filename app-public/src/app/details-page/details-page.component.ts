import {Component, OnInit} from '@angular/core';
import {SpacesDataService} from "../spaces-data.service";
import {ActivatedRoute, ParamMap} from "@angular/router";
import {Subscription, switchMap} from "rxjs";

export class Review {
  constructor(
      public _id: string,
      public rating: number,
      public name: string,
      public date: string,
      public review: string,
  ) {
  }
}

export class LocationDetails {
  constructor(
      public _id: string,
      public name: string,
      public address: string,
      public rating: number,
      public facilities: string[],
      public coords: number[],
      public openingHours: string[],
      public reviews: Review[],
  ) {
  }
}

@Component({
  selector: 'app-details-page',
  templateUrl: '/details-page.component.html',
  styles: [
  ]
})
export class DetailsPageComponent implements OnInit{
  locationDetails!: LocationDetails;
  pageContent = {
    header: {
      title: ``,
      strapline: ''
    },
    sidebar: [
        `This Location is on Loc8r because it has accessible wifi and space to sit down with your laptop and get some work done.`,
        'If you\'ve been and you like it - or if you don\'t - please leave a review to help other people just like you.'
    ]
  }

  constructor(private data: SpacesDataService, private route: ActivatedRoute) {
  }

  ngOnInit() {
    // get the id from the url and call the API to get location details
    this.route.paramMap.pipe(
        switchMap((params: ParamMap) =>
          this.data.getLocationById(params.get('locationId') as string)
        )
    ).subscribe(location => {
      this.pageContent.header.title = location.name;
      this.locationDetails = location;
    });
  }
}

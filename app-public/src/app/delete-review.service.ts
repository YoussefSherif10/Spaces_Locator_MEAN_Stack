import { Injectable } from '@angular/core';
import {Observable, Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class DeleteReviewService {
  private subject = new Subject();

  sendMessage(event: string, locationId: string, reviewId: string) {
    this.subject.next({event: event, locationId: locationId, reviewId: reviewId});
  }

  clearMessage() {
    this.subject.next({event: 'clear'});
  }

  getMessage(): Observable<any> {
    return this.subject.asObservable();
  }
}

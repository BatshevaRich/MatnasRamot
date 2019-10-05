import { Component, OnInit, OnDestroy } from '@angular/core';
import { Event } from 'src/app/classes/Event';
import { DataServiceService } from '../../Services/data-service.service';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.css']
})
export class EventComponent implements OnInit, OnDestroy {
  event: Event = new Event(1, 'ברירת מחדל', '1999');
  mySubscription: Subscription;
  id: number;
  constructor(public ds: DataServiceService, public ARS: ActivatedRoute) {

    this.mySubscription = ARS.params.subscribe((args) => {
      this.id = args.eventId;
      this.event = ds.getEvent(this.id);
      this.mySubscription.unsubscribe();
    });
  }
  ngOnInit() {
  }
  ngOnDestroy(): void {
    this.mySubscription.unsubscribe();
  }

}

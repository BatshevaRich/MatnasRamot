import { Component, OnInit, OnDestroy } from '@angular/core';
import { Eventt } from 'src/app/Classes/Eventt';
import { DataServiceService } from '../../Services/data-service.service';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { EventService } from 'src/app/services/event.service';

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.css']
})
export class EventComponent implements OnInit, OnDestroy {
  event: Eventt = new Eventt(1, 'ברירת מחדל', '1999');
  mySubscription: Subscription;
  id: number;
  constructor(public es: EventService, public ARS: ActivatedRoute) {

    this.mySubscription = ARS.params.subscribe((args) => {
      this.id = args.eventId;
      es.getEvent(this.id).subscribe(e => {
        this.event = e;
      });
      this.mySubscription.unsubscribe();
    });
  }
  ngOnInit() {
  }
  ngOnDestroy(): void {
    this.mySubscription.unsubscribe();
  }

}

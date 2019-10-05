import { Component, OnInit, OnDestroy } from '@angular/core';
import { Eventt } from 'src/app/Classes/Eventt';
import { DataServiceService } from '../../Services/data-service.service';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.css']
})
export class EventComponent implements OnInit, OnDestroy {
  event: Eventt = new Eventt(1, 'ברירת מחדל', '1999');
  mySubscription: Subscription;
  Id: number;
  constructor(public ds: DataServiceService, public ARS: ActivatedRoute) {

    this.mySubscription = ARS.params.subscribe((args) => {
      this.Id = args.eventId;
      this.event = ds.getEvent(this.Id);
      this.mySubscription.unsubscribe();
    });
  }
  ngOnInit() {
  }
  ngOnDestroy(): void {
    this.mySubscription.unsubscribe();
  }

}

import { Component, OnInit } from '@angular/core';
import { Eventt } from 'src/app/Classes/Eventt';
import { EventService } from 'src/app/services/event.service';

@Component({
  selector: 'app-all-events',
  templateUrl: './all-events.component.html',
  styleUrls: ['./all-events.component.css']
})
export class AllEventsComponent implements OnInit {
  events: Eventt[] = [];
  search = '';
  constructor(public es: EventService) {}
  ngOnInit() {
    this.es.getEvents() .subscribe(data => {
   this.events = data;
 }); }

 delete(e: number) {
   this.es.removeEvent(e);
   this.events = this.events.filter(eo => eo.Id !== e);
 }
}

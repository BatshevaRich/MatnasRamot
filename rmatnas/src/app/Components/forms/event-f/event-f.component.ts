import { Component, OnInit } from '@angular/core';
import { Event } from 'src/app/classes/Event';
import { DataServiceService } from '../../../Services/data-service.service';

@Component({
  selector: 'app-event-f',
  templateUrl: './event-f.component.html',
  styleUrls: ['./event-f.component.css']
})
export class EventFComponent implements OnInit {

  newEvent: Event = new Event(1, 'ברירת מחדל', 'ברירת מחדל');
  constructor(public ds: DataServiceService) { }

  ngOnInit() {
  }
  submitForm(f) {
    // tslint:disable-next-line: max-line-length
    this.ds.addEvent(new Event(this.newEvent.id, this.newEvent.description, this.newEvent.date));
    f.reset();
  }
}

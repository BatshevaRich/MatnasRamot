import { Component, OnInit } from '@angular/core';
import { Eventt } from 'src/app/Classes/Eventt';
import { EventService } from 'src/app/services/event.service';

@Component({
  selector: 'app-event-f',
  templateUrl: './event-f.component.html',
  styleUrls: ['./event-f.component.css']
})
export class EventFComponent implements OnInit {

  newEvent: Eventt = new Eventt(1, 'ברירת מחדל', 'ברירת מחדל');
  constructor(public es: EventService) { }

  ngOnInit() {
  }
  submitForm(f) {
    // tslint:disable-next-line: max-line-length
    this.es.addEvent(new Eventt(this.newEvent.Id, this.newEvent.Description, this.newEvent.DateAdded));
    f.reset();
  }
}

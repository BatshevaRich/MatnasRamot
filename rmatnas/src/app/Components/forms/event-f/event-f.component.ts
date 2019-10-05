import { Component, OnInit } from '@angular/core';
import { Eventt } from 'src/app/Classes/Eventt';
import { DataServiceService } from '../../../Services/data-service.service';

@Component({
  selector: 'app-event-f',
  templateUrl: './event-f.component.html',
  styleUrls: ['./event-f.component.css']
})
export class EventFComponent implements OnInit {

  newEvent: Eventt = new Eventt(1, 'ברירת מחדל', 'ברירת מחדל');
  constructor(public ds: DataServiceService) { }

  ngOnInit() {
  }
  submitForm(f) {
    // tslint:disable-next-line: max-line-length
    this.ds.addEvent(new Eventt(this.newEvent.Id, this.newEvent.description, this.newEvent.date));
    f.reset();
  }
}

import { Component, OnInit } from '@angular/core';
import { DataServiceService } from '../../../Services/data-service.service';
import { Eventt } from 'src/app/Classes/Eventt';

@Component({
  selector: 'app-all-events',
  templateUrl: './all-events.component.html',
  styleUrls: ['./all-events.component.css']
})
export class AllEventsComponent implements OnInit {
  events: Eventt[] = [];
  search = '';
  constructor(public ds: DataServiceService) {}

  ngOnInit() {
    this.events = this.ds.getAllEvents();
  }
}

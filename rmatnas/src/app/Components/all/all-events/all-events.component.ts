import { Component, OnInit } from '@angular/core';
import { DataServiceService } from '../../../Services/data-service.service';
import { Event } from 'src/app/classes/Event';

@Component({
  selector: 'app-all-events',
  templateUrl: './all-events.component.html',
  styleUrls: ['./all-events.component.css']
})
export class AllEventsComponent implements OnInit {
  events: Event[] = [];
  search = '';
  constructor(public ds: DataServiceService) {}

  ngOnInit() {
    this.events = this.ds.getAllEvents();
  }
}

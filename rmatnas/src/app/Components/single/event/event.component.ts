import { Component, OnInit, OnDestroy, Input, Output, EventEmitter, ElementRef } from '@angular/core';
import { Eventt } from 'src/app/Classes/Eventt';

import { Subscription } from 'rxjs';
import { EventService } from 'src/app/services/event.service';
import { Category } from 'src/app/Classes/Category';
import { MatDialog } from '@angular/material';
import { EventFComponent } from '../../forms/event-f/event-f.component';

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.css']
})
export class EventComponent implements OnInit, OnDestroy {
  chooseTab: string;
  myEvent: Eventt;
  categories: Category[] = [];
  id: number;
  @Input() vId: number;
  @Input() toV: boolean;
  @Output() addedEvent: EventEmitter<Eventt> = new EventEmitter<Eventt>();
  mySubscription: Subscription;
  constructor(public es: EventService,
              public dialog: MatDialog,
              private elementRef: ElementRef) {
    this.myEvent = new Eventt('...', '...', '11/10/1999', '11/10/1999', '11/10/1999');
  }
  ngOnInit() {
    this.es.getEvent(this.vId).subscribe(v => {
      this.myEvent = v;
      // this.vs.getCategoriesOfVolunteer(this.vId).subscribe(c => {
      //   this.categories = c;
      // });
    });
  }
  ngOnDestroy(): void {
    this.elementRef.nativeElement.remove();
  }

  EventOpenDialog() {
    const dialogRef = this.dialog.open(EventFComponent, {
      data: {
        dataKey: this.myEvent,
        update: true,
        id: this.myEvent.Id,
        chosenC: this.categories
      }
    });
    dialogRef.afterClosed().subscribe(res => {
      this.addedEvent.emit(res);
    });
  }

}

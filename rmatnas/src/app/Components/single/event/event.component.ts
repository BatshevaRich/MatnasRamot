import { Component, OnInit, OnDestroy, Input, Output, EventEmitter } from '@angular/core';
import { Eventt } from 'src/app/Classes/Eventt';
import { ActivatedRoute } from '@angular/router';
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
  constructor(public es: EventService, public dialog: MatDialog, public ARS: ActivatedRoute) {

    this.mySubscription = ARS.params.subscribe((args) => {
      this.id = args.eventId;
      es.getEvent(this.id).subscribe(e => {
        this.myEvent = e;
      });
      if (this.mySubscription) {
      this.mySubscription.unsubscribe();
    }
    });
  }
  ngOnInit() {
  }
  ngOnDestroy(): void {
    if (this.mySubscription) {
      this.mySubscription.unsubscribe();
    }
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

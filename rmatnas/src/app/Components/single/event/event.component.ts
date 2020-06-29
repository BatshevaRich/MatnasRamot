import { Component, OnInit, OnDestroy, Input, Output, EventEmitter, ElementRef } from '@angular/core';
import { Eventt } from 'src/app/Classes/Eventt';
import { EventService } from 'src/app/services/event.service';
import { Category } from 'src/app/Classes/Category';
import { MatDialog } from '@angular/material/dialog';
import { MatTabChangeEvent } from '@angular/material/tabs';
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
  smallest = '20%';
  small = '80%';
  large = '100%';
  largest = '0%';
  @Output() addedEvent: EventEmitter<Eventt> = new EventEmitter<Eventt>();
  selectedTabIndex: any;
  showFamily: boolean;
  showOrganization: boolean;
  showVolunteer = true;
  constructor(public es: EventService,
              public dialog: MatDialog,
              private elementRef: ElementRef) {
    this.myEvent = new Eventt('...', '...', '11/10/1999', '11/10/1999', '11/10/1999');
  }
  ngOnInit() {
    this.es.getEvent(this.vId).subscribe(v => {
      this.myEvent = v;
      this.es.getCategoriesOfEvent(this.vId).subscribe((c: Category[]) => {
        this.categories = c;
      });
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

  onTabChange(event: MatTabChangeEvent) {
    setTimeout(() => {
      this.selectedTabIndex = event;
      if (event.index === 2) {
        this.showOrganization = true;
      }
      if (event.index === 1) {
        this.showVolunteer = true;
      }
      // if (event.index === 2) {
      //   this.showFamily = true;
      // }
    });
  }

}

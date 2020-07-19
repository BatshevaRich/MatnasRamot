import { Component, OnInit, AfterViewInit, ElementRef, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { NotificationService } from '../../../services/notification.service';
import { Router } from '@angular/router';
import { Volunteer } from '../../../Classes/Volunteer';
import { Family } from '../../../Classes/Family';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, AfterViewInit, OnDestroy {
  panelOpenState = false;
  familyBadge = 0;
  eventBadge = 0;
  closestEvent: string;
  DateClosestEvent: string;
  DaysToEvent: number;
  mostVolunteer: Volunteer;
  mostFamily: Family;
  constructor(public dialog: MatDialog,
              public router: Router,
              public ns: NotificationService,
              private elementRef: ElementRef,
              private cdr: ChangeDetectorRef) {
    const temp = this.ns.Events.map(d => Math.abs(Date.now() - new Date(d.StartDate).getTime()));
    const idx = temp.indexOf(Math.min(...temp));
    this.closestEvent = this.ns.Events[idx].Name;
    this.DateClosestEvent = this.ns.Events[idx].StartDate;
    const d = this.ns.Events[idx].StartDate.slice(0, 10).split('-');
    const x = d[1] + '/' + d[2] + '/' + d[0];
    const diff = Math.abs(new Date(x).getTime() - new Date().getTime());
    this.DaysToEvent  = Math.ceil(diff / (1000 * 3600 * 24)); 
    this.ns.getMostVolunteer().subscribe((res: Volunteer) => {
      this.mostVolunteer = res;
    });
    this.ns.getMostFamily().subscribe((res: Family) => {
      this.mostFamily = res;
    });
  }

  ngAfterViewInit() {
    this.familyBadge = this.ns.Families.length;
    this.eventBadge = this.ns.Events.length;
    this.cdr.detectChanges();
  }

  ngOnInit() { }

  ngOnDestroy(): void {
    this.elementRef.nativeElement.remove();
  }

}

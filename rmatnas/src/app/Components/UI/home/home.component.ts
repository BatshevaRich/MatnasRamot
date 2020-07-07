import { Component, OnInit, AfterViewInit, ElementRef, OnDestroy } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { NotificationService } from '../../../services/notification.service';
import { Router } from '@angular/router';
import { Eventt } from '../../../Classes/Eventt';
import { Family } from '../../../Classes/Family';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, AfterViewInit, OnDestroy {

  familyBadge = 0;
  volunteerBadge = 0;
  eventBadge = 0;
  organizationBadge = 0;
  categoryBadge = 0;
  constructor(public dialog: MatDialog,
              public router: Router,
              public ns: NotificationService,
              private elementRef: ElementRef) {
    this.ns.getAllFamiliesToConnect().subscribe((res: Family[]) => {
      this.familyBadge = res.length;
    });
    this.ns.getAllEventsToConnect().subscribe((res: Eventt[]) => {
      this.eventBadge = res.length;
    });
  }

  ngAfterViewInit() {
    // this.familyBadge = this.ns.Families.length;
    // this.volunteerBadge = this.ns.Volunteers.length;
    // this.eventBadge = this.ns.Events.length;
    // this.organizationBadge = this.ns.Organizations.length;
  }

  ngOnInit() {

  }

  ngOnDestroy(): void {
    this.elementRef.nativeElement.remove();
  }

}

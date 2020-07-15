import { Component, OnInit, AfterViewInit, OnDestroy, ElementRef, ChangeDetectorRef } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { VolunteerFComponent } from '../../forms/volunteer-f/volunteer-f.component';
import { FamilyFComponent } from '../../forms/family-f/family-f.component';
import { AddVFComponent } from '../../forms/add/add-vf/add-vf.component';
import { OrganizationFComponent } from '../../forms/organization-f/organization-f.component';
import { EventFComponent } from '../../forms/event-f/event-f.component';
import { NotificationService } from '../../../services/notification.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, AfterViewInit, OnDestroy {
  allBadge = 0;
  familyBadge = 0;
  eventBadge = 0;
  subscriptionFamily: Subscription;
  subscriptionEvent: Subscription;
  constructor(public dialog: MatDialog,
              private elementRef: ElementRef,
              public ns: NotificationService,
              private cdr: ChangeDetectorRef) {
    this.subscriptionFamily = this.ns.updateFamily$.subscribe(
      update => {
        this.familyBadge = update;
        this.allBadge = this.eventBadge + this.familyBadge;
      });
    this.subscriptionEvent = this.ns.updateEvent$.subscribe(
      update => {
        this.eventBadge = update;
        this.allBadge = this.eventBadge + this.familyBadge;
      });
  }

  ngAfterViewInit() {
    this.familyBadge = this.ns.Families.length;
    this.eventBadge = this.ns.Events.length;
    this.allBadge = this.familyBadge + this.eventBadge;
    this.cdr.detectChanges();
  }

  ngOnInit(): void {
  }

  VolunteeropenDialog() {
    const dialogRef = this.dialog.open(VolunteerFComponent, {
      data: {
        dataKey: null,
        update: false
      }
    });
    dialogRef.afterClosed().subscribe(res => {
    });
  }
  FamilyopenDialog() {
    const dialogRef = this.dialog.open(FamilyFComponent, {
      data: {
        dataKey: null,
        update: false
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      this.ns.Families.push(result);
    });
  }
  ToVolunteeropenDialog() {
    const dialogRef = this.dialog.open(AddVFComponent, {
      height: '75%',
      width: '100vh',
      data: {
        dataKey: null,
        update: false
      }
    });
    dialogRef.afterClosed().subscribe(result => {
    });
  }
  OrganizationopenDialog() {
    const dialogRef = this.dialog.open(OrganizationFComponent, {
      data: {
        dataKey: null,
        update: false
      }
    });
    dialogRef.afterClosed().subscribe(result => {
    });
  }
  EventopenDialog() {
    const dialogRef = this.dialog.open(EventFComponent, {
      data: {
        dataKey: null,
        update: false
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      this.ns.Events.push(result);
    });
  }

  ngOnDestroy(): void {
    this.elementRef.nativeElement.remove();
    this.subscriptionEvent.unsubscribe();
    this.subscriptionFamily.unsubscribe();
  }

}

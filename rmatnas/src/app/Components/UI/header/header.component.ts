import { Component, OnInit, AfterViewInit, OnDestroy, ElementRef } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { VolunteerFComponent } from '../../forms/volunteer-f/volunteer-f.component';
import { FamilyFComponent } from '../../forms/family-f/family-f.component';
import { AddVFComponent } from '../../forms/add/add-vf/add-vf.component';
import { OrganizationFComponent } from '../../forms/organization-f/organization-f.component';
import { EventFComponent } from '../../forms/event-f/event-f.component';
import { NotificationService } from '../../../services/notification.service';
import { Family } from '../../../Classes/Family';
import { Eventt } from '../../../Classes/Eventt';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, AfterViewInit, OnDestroy {
  allBadge = 0;
  familyBadge = 0;
  volunteerBadge = 0;
  eventBadge = 0;
  organizationBadge = 0;
  categoryBadge = 0;
  constructor(public dialog: MatDialog,
              private elementRef: ElementRef,
              public ns: NotificationService) {
                this.ns.getAllFamiliesToConnect().subscribe((res: Family[]) => {
                  this.familyBadge = res.length;
                  this.allBadge += res.length;
                });
                this.ns.getAllEventsToConnect().subscribe((res: Eventt[]) => {
                  this.eventBadge = res.length;
                  this.allBadge += res.length;
                });
              }

  ngAfterViewInit() {
    // this.ns.getAllFamiliesToConnect();
    // this.familyBadge = this.ns.Families.length;
    this.volunteerBadge = this.ns.Volunteers.length;
    this.eventBadge = this.ns.Events.length;
    this.organizationBadge = this.ns.Organizations.length;
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
    });
  }

  ngOnDestroy(): void {
    this.elementRef.nativeElement.remove();
  }

}

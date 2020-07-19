import { Component, OnInit, AfterViewInit, ElementRef, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { NotificationService } from '../../../services/notification.service';
import { Router } from '@angular/router';
import { Volunteer } from '../../../Classes/Volunteer';
import { Family } from '../../../Classes/Family';
import { VolunteerService } from '../../../services/volunteer.service';
import { FamilyService } from '../../../services/family.service';
import { Category } from '../../../Classes/Category';
import { Organization } from '../../../Classes/Organization';
import { OrganizationService } from '../../../services/organization.service';
import { OrganizationAndFamilyService } from '../../../services/organization-and-family.service';

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
  CatsOfVolunteer: Category[];
  catsOfFamily: Category[];
  mostOrganization: Organization;
  constructor(public dialog: MatDialog,
              public router: Router,
              public ns: NotificationService,
              public vs: VolunteerService,
              public fs: FamilyService,
              public os: OrganizationAndFamilyService,
              private elementRef: ElementRef,
              private cdr: ChangeDetectorRef) {
    const temp = this.ns.Events.map(e => Math.abs(Date.now() - new Date(e.StartDate).getTime()));
    const idx = temp.indexOf(Math.min(...temp));
    this.closestEvent = this.ns.Events[idx].Name;
    this.DateClosestEvent = this.ns.Events[idx].StartDate;
    const d = this.ns.Events[idx].StartDate.slice(0, 10).split('-');
    const x = d[1] + '/' + d[2] + '/' + d[0];
    const diff = Math.abs(new Date(x).getTime() - new Date().getTime());
    this.DaysToEvent  = Math.ceil(diff / (1000 * 3600 * 24));
    this.ns.getMostVolunteer().subscribe((res: Volunteer) => {
      this.mostVolunteer = res;
      this.vs.getCategoriesOfVolunteer(res.Id).subscribe((cats: Category[]) => {
        this.CatsOfVolunteer = cats;
      });
    });
    this.ns.getMostFamily().subscribe((res: Family) => {
      this.mostFamily = res;
      this.fs.getCategoriesOfFamily(res.Id).subscribe((cats: Category[]) => {
        this.catsOfFamily = cats;
      });
    });
    this.ns.getMostOrganization().subscribe((res: Organization) => {
      this.mostOrganization = res;
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

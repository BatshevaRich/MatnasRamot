import { Component, OnInit, OnDestroy, Input, Output, EventEmitter, ElementRef, AfterViewInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { Organization } from 'src/app/Classes/Organization';
import { Category } from 'src/app/Classes/Category';
import { OrganizationService } from 'src/app/services/organization.service';
import { MatDialog } from '@angular/material';
import { OrganizationFComponent } from '../../forms/organization-f/organization-f.component';

@Component({
  selector: 'app-organization',
  templateUrl: './organization.component.html',
  styleUrls: ['./organization.component.css']
})
export class OrganizationComponent implements OnInit, OnDestroy, AfterViewInit {

  chooseTab: string;
  myOrganization: Organization;
  categories: Category[] = [];
  id: number;
  @Input() vId: number;
  @Input() toV: boolean;
  @Output() addedOrganization: EventEmitter<Organization> = new EventEmitter<Organization>();
  mySubscription: Subscription;
  selectedTabIndex: any;
  showEvent: boolean;
  showFamily: boolean;
  showOrganization: boolean;
  showVolunteer: boolean;
  constructor(public os: OrganizationService,
              public dialog: MatDialog,
              private elementRef: ElementRef) {
    this.myOrganization = new Organization('...', '...', '...', '...', '...', '...');
  }

  ngOnInit() {

  }

  ngOnDestroy(): void {
    this.elementRef.nativeElement.remove();
  }

  ngAfterViewInit() {
    this.os.getOrganization(this.vId).subscribe(v => {
      this.myOrganization = v;
      this.os.getCategoriesOfOrganization(this.vId).subscribe(c => {
        this.categories = c;
      });
    });
  }

  OrganizationOpenDialog() {
    const dialogRef = this.dialog.open(OrganizationFComponent, {
      data: {
        dataKey: this.myOrganization,
        update: true,
        id: this.myOrganization.Id,
        chosenC: this.categories
      }
    });
    dialogRef.afterClosed().subscribe(res => {
      this.addedOrganization.emit(res);
    });
  }

  onTabChange(event) {
    setTimeout(() => {
      this.selectedTabIndex = event;
      if (event.index === 2) {
        this.showEvent = true;
      }
      if (event.index === 1) {
        this.showFamily = true;
      }
    });
  }

}

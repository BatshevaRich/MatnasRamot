import { Component, OnInit, OnDestroy, Input, Output, EventEmitter, ElementRef, AfterViewInit } from '@angular/core';
import { Organization } from '../../../Classes/Organization';
import { Category } from '../../../Classes/Category';
import { OrganizationService } from '../../../services/organization.service';
import { MatDialog } from '@angular/material/dialog';
import { MatTabChangeEvent } from '@angular/material/tabs';
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
  smallest = '20%';
  small = '80%';
  large = '100%';
  largest = '0%';
  @Output() addedOrganization: EventEmitter<Organization> = new EventEmitter<Organization>();
  selectedTabIndex: any;
  showEvent: boolean;
  showFamily = true;
  showVolunteer = true;
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
    this.os.getOrganization(this.vId).subscribe((o: Organization) => {
      this.myOrganization = this.os.trimResultFromUpdate(o);
      this.os.getCategoriesOfOrganization(this.vId).subscribe((c: Category[]) => {
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

  onTabChange(event: MatTabChangeEvent) {
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

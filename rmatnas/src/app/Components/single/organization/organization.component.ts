import { Component, OnInit, OnDestroy, Input, Output, EventEmitter, ElementRef } from '@angular/core';
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
export class OrganizationComponent implements OnInit, OnDestroy {

  chooseTab: string;
  myOrganization: Organization;
  categories: Category[] = [];
  id: number;
  @Input() vId: number;
  @Input() toV: boolean;
  @Output() addedOrganization: EventEmitter<Organization> = new EventEmitter<Organization>();
  mySubscription: Subscription;
  constructor(public vs: OrganizationService,
              public dialog: MatDialog,
              private elementRef: ElementRef) {
    this.myOrganization = new Organization('...', '...', '...', '...', '...', '...');
  }

  ngOnDestroy(): void {
    this.elementRef.nativeElement.remove();
  }

  ngOnInit() {
    this.vs.getOrganization(this.vId).subscribe(v => {
      this.myOrganization = v;
      // this.vs.getCategoriesOfOrganization(this.vId).subscribe(c => {
      //   this.categories = c;
      // });
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

}

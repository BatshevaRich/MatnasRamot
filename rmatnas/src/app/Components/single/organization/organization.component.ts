import { Component, OnInit, OnDestroy, Input, Output, EventEmitter } from '@angular/core';
import { Subscription } from 'rxjs';
import { DataServiceService } from '../../../Services/data-service.service';
import { ActivatedRoute } from '@angular/router';
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
  constructor(public vs: OrganizationService, public ARS: ActivatedRoute, public dialog: MatDialog) {
    this.myOrganization = new Organization('...', '...', '...', '...', '...', '...');
  }

  ngOnDestroy(): void {
    if (this.mySubscription) {
      this.mySubscription.unsubscribe();
    }

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

import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { DataServiceService } from '../../../Services/data-service.service';
import { ActivatedRoute } from '@angular/router';
import { Organization } from 'src/app/Classes/Organization';

@Component({
  selector: 'app-organization',
  templateUrl: './organization.component.html',
  styleUrls: ['./organization.component.css']
})
export class OrganizationComponent implements OnInit, OnDestroy {

  organization: Organization = new Organization(1, 'ברירת מחדל', 'ברירת מחדל', '11', 'ברירת מחדל', 'ברירת מחדל', '11@11');
  mySubscription: Subscription;
  Id: number;
  constructor(public ds: DataServiceService, public ARS: ActivatedRoute) {

    this.mySubscription = ARS.params.subscribe((args) => {
      this.Id = args.organizationId;
      this.organization = ds.getOrganization(this.Id);
      if (this.mySubscription) {
      this.mySubscription.unsubscribe();
    }
    });
  }
  ngOnInit() {
  }
  ngOnDestroy(): void {
    if (this.mySubscription) {
      this.mySubscription.unsubscribe();
    }
  }

}

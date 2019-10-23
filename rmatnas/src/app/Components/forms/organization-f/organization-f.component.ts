import { Component, OnInit } from '@angular/core';
import { Organization } from 'src/app/classes/Organization';
import { DataServiceService } from '../../../Services/data-service.service';

@Component({
  selector: 'app-organization-f',
  templateUrl: './organization-f.component.html',
  styleUrls: ['./organization-f.component.css']
})
export class OrganizationFComponent implements OnInit {
  newOrganization: Organization = new Organization(1, 'ברירת מחדל', 'ברירת מחדל', '11', 'ברירת מחדל', 'ברירת מחדל', '1@1');
  constructor(public ds: DataServiceService) { }

  ngOnInit() {
  }
  submitForm(f) {
    this.ds.addOrganization(new Organization(this.newOrganization.Id, this.newOrganization.name, this.newOrganization.contact, this.newOrganization.phone, this.newOrganization.address, this.newOrganization.comments, this.newOrganization.email) );
    f.reset();
  }
}

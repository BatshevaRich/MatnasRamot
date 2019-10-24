import { Component, OnInit } from '@angular/core';
import { Organization } from 'src/app/Classes/Organization';
import { DataServiceService } from '../../../Services/data-service.service';

@Component({
  selector: 'app-all-organizations',
  templateUrl: './all-organizations.component.html',
  styleUrls: ['./all-organizations.component.css']
})
export class AllOrganizationsComponent implements OnInit {
  organizations: Organization[] = [];
  search = '';
  constructor(public ds: DataServiceService) { }

  ngOnInit() {
    this.organizations = this.ds.getAllOrganizations();
  }

}

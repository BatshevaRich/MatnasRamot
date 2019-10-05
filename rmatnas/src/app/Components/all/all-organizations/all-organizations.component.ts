import { Component, OnInit } from '@angular/core';
import { Organization } from 'src/app/classes/Organization';
import { GroupService } from 'src/app/services/group.service';

@Component({
  selector: 'app-all-organizations',
  templateUrl: './all-organizations.component.html',
  styleUrls: ['./all-organizations.component.css']
})
export class AllOrganizationsComponent implements OnInit {
  organizations: Organization[] = [];
  search = '';
  constructor(public gs: GroupService) { }

  ngOnInit() {
    this.gs.getOrganizations().subscribe(data => {
      this.organizations = data;
      console.log(this.organizations);
    });
    //this.organizations = this.ds.getAllOrganizations();
    
  }

}

import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { Organization } from 'src/app/Classes/Organization';
import { DataServiceService } from '../../../Services/data-service.service';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { MatSort, MatTable, MatPaginator, MatTableDataSource } from '@angular/material';
import { OrganizationService } from 'src/app/services/organization.service';
export interface Details {
  Id: number;
  Name: string;
  Address: string;
  // Telephone: string;
  Pelephone: string;
  Email: string;
  Age: Date;
  // Comments: string;
  IsActive: boolean;
}

@Component({
  selector: 'app-all-organizations',
  templateUrl: './all-organizations.component.html',
  styleUrls: ['./all-organizations.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})

export class AllOrganizationsComponent implements OnInit {
  organizations: any;
  search = '';
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatTable) table: MatTable<any>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  displayedColumns = ['Name', 'Address', 'Pelephone', 'Email', 'Age', 'IsActive', 'columndelete'];
  expandedElement: Details | null;
  dataSource = new MatTableDataSource();
  resultsLength = 0;
  @Input() vId: number;
  inp: boolean;
  result = '';
  loaded = false;
  error = false;
  notFound = false;

  constructor(public os: OrganizationService) { }

  ngOnInit() {
    this.organizations = this.os.getOrganizations().subscribe((organizations: Organization[]) => {
      this.loaded = true;
      if (organizations.length === 0) {
        this.notFound = true;
      } else {
        this.organizations = organizations;
        this.dataSource.data = organizations;
        this.resultsLength = this.dataSource.data.length;
        this.error = false;
      }
    }, err => { this.error = true; this.loaded = true; });
  }

}

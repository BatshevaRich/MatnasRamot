import { Component, OnInit, ViewChild, Input, AfterViewInit } from '@angular/core';
import { Organization } from 'src/app/Classes/Organization';
import { DataServiceService } from '../../../Services/data-service.service';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { MatSort, MatTable, MatPaginator, MatTableDataSource, MatDialog } from '@angular/material';
import { OrganizationService } from 'src/app/services/organization.service';
import { Observable } from 'rxjs';
import { ConfirmDialogModel, ConfirmDialogComponent } from '../../forms/confirm-dialog/confirm-dialog.component';
export interface Details {
  Id: number;
  Name: string;
  Contact: string;
  Phone: string;
  Address: string;
  Comments: string;
  email: string;
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

export class AllOrganizationsComponent implements OnInit, AfterViewInit {
  organizations: any;
  search = '';
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatTable) table: MatTable<any>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  displayedColumns = ['Name', 'Contact', 'Phone', 'Address', 'Email', 'addVolunteer', 'addFamily', 'columndelete'];
  expandedElement: Details | null;
  dataSource = new MatTableDataSource();
  resultsLength = 0;
  @Input() vId: number;
  inp: boolean;
  result = '';
  loaded = false;
  error = false;
  notFound = false;

  constructor(public os: OrganizationService,
              public dialog: MatDialog) { }

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

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  confirmDialog(): Observable<any> {
    const message = `מחיקה זו היא לצמיתות! האם תרצי להמשיך?`;
    const dialogData = new ConfirmDialogModel('מחיקת מתנדבת', message);
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      maxWidth: '75%',
      data: dialogData
    });
    return dialogRef.afterClosed();
  }

  delete(event, elm) {
    this.confirmDialog().subscribe(res => {
      this.result = res;
      if (res) {
        // this.os.removeVolunteer(elm.Id);
        // this.dataSource.data = this.dataSource.data
        //   .filter(i => i !== elm);
        // .map((i, idx) => (i.position = (idx + 1), i));
      }
    });
  }

  addVolunteer(event, elm) {
    // this.os.addVolunteerToOrganization()
  }

  addFamily(event, elm) {

  }

}

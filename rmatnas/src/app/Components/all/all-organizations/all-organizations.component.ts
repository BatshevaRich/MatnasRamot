import { Component, OnInit, ViewChild, Input, AfterViewInit, OnDestroy, ElementRef } from '@angular/core';
import { Organization } from 'src/app/Classes/Organization';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { MatSort, MatTable, MatPaginator, MatTableDataSource, MatDialog } from '@angular/material';
import { OrganizationService } from 'src/app/services/organization.service';
import { Observable } from 'rxjs';
import { ConfirmDialogModel, ConfirmDialogComponent } from '../../UI/confirm-dialog/confirm-dialog.component';
import { AddFOComponent } from '../../forms/add/add-fo/add-fo.component';
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

export class AllOrganizationsComponent implements OnInit, OnDestroy, AfterViewInit {
  organizations: any;
  search = '';
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatTable) table: MatTable<any>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  displayedColumns = ['showDetails', 'Name', 'Contact', 'Phone', 'Address', 'Email', 'addFamily', 'columndelete'];
  expandedElement: Details | null;
  dataSource = new MatTableDataSource([]);
  resultsLength = 0;
  @Input() vId: number;
  inp: boolean;
  result = '';
  loaded = false;
  error = false;
  notFound = false;

  constructor(public os: OrganizationService,
              public dialog: MatDialog,
              private elementRef: ElementRef) { }

  ngOnDestroy() {
    this.elementRef.nativeElement.remove();
  }
  ngOnInit() {
    if (this.vId) {
      this.displayedColumns = ['Name', 'Contact', 'Phone', 'Address', 'Email'];
    }
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    if (this.vId) {
      this.inp = true;
      this.os.getOrganizationsForFamily(this.vId).subscribe((data: Organization[]) => {
        this.loaded = true;
        if (data.length === 0) {
          this.notFound = true;
        } else {
          this.organizations = this.trimResultsFromDB(data);
          this.dataSource.data = data;
          this.resultsLength = this.dataSource.data.length;
        }
      });
    } else {
      this.os.getOrganizations().subscribe((organizations: Organization[]) => {
        this.loaded = true;
        if (organizations.length === 0) {
          this.notFound = true;
        } else {
          this.organizations = this.trimResultsFromDB(organizations);
          this.dataSource.data = organizations;
          this.resultsLength = this.dataSource.data.length;
          this.error = false;
        }
      }, err => { this.error = true; this.loaded = true; });
    }
  }

  trimResultsFromDB(organizations: Organization[]) {
    for (const organization of organizations) {
      organization.Name = organization.Name.trim();
      organization.email = organization.email.trim();
      organization.Address == null ? organization.Address = '' : organization.Address = organization.Address.trim();
      organization.Phone == null ? organization.Phone = '' : organization.Phone = organization.Phone.trim();
      organization.Comments == null ? organization.Comments = '' : organization.Comments = organization.Comments.trim();
      organization.Contact == null ? organization.Contact = '' : organization.Contact = organization.Contact.trim();
    }
    return organizations;
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
        this.os.removeOrganization(elm.Id);
        this.dataSource.data = this.dataSource.data
          .filter(i => i !== elm);
        // .map((i, idx) => (i.position = (idx + 1), i));
      }
    });
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }

  showDetails(element) {
    element.show = !element.show;
  }

  addFamily(event, elm) {
    const dialogRef = this.dialog.open(AddFOComponent, {
      maxWidth: '75%',
      data: {
        id: event.Id
      }
    });
    return dialogRef.afterClosed();
  }

  trimResultFromUpdate(organization: Organization) {
    organization.Name = organization.Name.trim();
    organization.email = organization.email.trim();
    organization.Address == null ? organization.Address = '' : organization.Address = organization.Address.trim();
    organization.Phone == null ? organization.Phone = '' : organization.Phone = organization.Phone.trim();
    organization.Comments == null ? organization.Comments = '' : organization.Comments = organization.Comments.trim();
    organization.Contact == null ? organization.Contact = '' : organization.Contact = organization.Contact.trim();
    return organization;
  }

  updateTable(event) {
    this.dataSource.data = this.dataSource.data.map((item: Organization) => item.Id === event.Id ? this.trimResultFromUpdate(event) : item);
    this.table.renderRows();
  }

}

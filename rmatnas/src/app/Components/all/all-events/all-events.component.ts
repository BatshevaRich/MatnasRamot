import { Component, OnInit, ViewChild, Input, AfterViewInit } from '@angular/core';
import { Eventt } from 'src/app/Classes/Eventt';
import { EventService } from 'src/app/services/event.service';
import { MatSort, MatTable, MatPaginator, MatTableDataSource, MatDialog } from '@angular/material';
import { Observable } from 'rxjs';
import { ConfirmDialogModel, ConfirmDialogComponent } from '../../forms/confirm-dialog/confirm-dialog.component';
export interface Details {
  Id: number;
  Name: string;
  Description: string;
  StartDate: string;
  EndDate: string;
  DateAdded: string;
}

@Component({
  selector: 'app-all-events',
  templateUrl: './all-events.component.html',
  styleUrls: ['./all-events.component.css']
})
export class AllEventsComponent implements OnInit, AfterViewInit {
  eventts: any;
  search = '';
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatTable) table: MatTable<any>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  displayedColumns = ['Name', 'Description', 'StartDate', 'EndDate', 'columndelete'];
  expandedElement: Details | null;
  dataSource = new MatTableDataSource();
  resultsLength = 0;
  @Input() vId: number;
  inp: boolean;
  result = '';
  loaded = false;
  error = false;
  notFound = false;

  constructor(public es: EventService,
              public dialog: MatDialog) { }

  ngOnInit() {
    this.eventts = this.es.getEvents().subscribe((events: Eventt[]) => {
      this.loaded = true;
      if (events.length === 0) {
        this.notFound = true;
      } else {
        this.eventts = events;
        this.dataSource.data = events;
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
    const dialogData = new ConfirmDialogModel('מחיקת ארוע', message);
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

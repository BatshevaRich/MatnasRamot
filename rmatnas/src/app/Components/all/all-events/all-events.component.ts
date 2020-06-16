import { Component, OnInit, ViewChild, Input, AfterViewInit, OnDestroy, ElementRef } from '@angular/core';
import { Eventt } from 'src/app/Classes/Eventt';
import { EventService } from 'src/app/services/event.service';
import { MatSort, MatTable, MatPaginator, MatTableDataSource, MatDialog } from '@angular/material';
import { Observable } from 'rxjs';
import { ConfirmDialogModel, ConfirmDialogComponent } from '../../UI/confirm-dialog/confirm-dialog.component';
import { trigger, state, style, transition, animate } from '@angular/animations';
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
  styleUrls: ['./all-events.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class AllEventsComponent implements OnInit, OnDestroy, AfterViewInit {
  eventts: any;
  search = '';
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatTable) table: MatTable<any>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  displayedColumns = ['showDetails', 'Name', 'Description', 'StartDate', 'EndDate', 'addvolunteer', 'addfamily', 'columndelete'];
  expandedElement: Details | null;
  dataSource = new MatTableDataSource([]);
  resultsLength = 0;
  @Input() vId: number;
  inp: boolean;
  result = '';
  loaded = false;
  error = false;
  notFound = false;

  constructor(public es: EventService,
              public dialog: MatDialog,
              private elementRef: ElementRef) { }

  ngOnInit() {
    if (this.vId) {
      this.displayedColumns = ['Name', 'Description', 'StartDate', 'EndDate'];
    }
  }

  ngOnDestroy() {
    this.elementRef.nativeElement.remove();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.es.getEvents().subscribe((events: Eventt[]) => {
      this.loaded = true;
      if (events.length === 0) {
        this.notFound = true;
      } else {
        this.eventts = this.trimResultsFromDB(events);
        this.dataSource.data = this.eventts;
        this.resultsLength = this.dataSource.data.length;
        this.error = false;
      }
    }, err => { this.error = true; this.loaded = true; });
  }

  trimResultsFromDB(events: Eventt[]) {
    for (const eventt of events) {
      eventt.Name = eventt.Name.trim();
      eventt.StartDate == null ? eventt.StartDate = '' : eventt.StartDate = eventt.StartDate.trim();
      eventt.EndDate == null ? eventt.EndDate = '' : eventt.EndDate = eventt.EndDate.trim();
      eventt.DateAdded == null ? eventt.DateAdded = '' : eventt.DateAdded = eventt.DateAdded.trim();
      eventt.Description == null ? eventt.Description = '' : eventt.Description = eventt.Description.trim();
    }
    return events;
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

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }

  showDetails(element) {
    element.show = !element.show;
  }

  trimResultFromUpdate(eventt: Eventt) {
      eventt.Name = eventt.Name.trim();
      eventt.StartDate == null ? eventt.StartDate = '' : eventt.StartDate = eventt.StartDate.trim();
      eventt.EndDate == null ? eventt.EndDate = '' : eventt.EndDate = eventt.EndDate.trim();
      eventt.DateAdded == null ? eventt.DateAdded = '' : eventt.DateAdded = eventt.DateAdded.trim();
      eventt.Description == null ? eventt.Description = '' : eventt.Description = eventt.Description.trim();
      return eventt;
  }

  updateTable(event) {
    this.dataSource.data = this.dataSource.data.map((item: Eventt) => item.Id === event.Id ? this.trimResultFromUpdate(event) : item);
    this.table.renderRows();
  }

  addVolunteer(event, elm) {

  }

  addFamily(event, elm) {

  }

}

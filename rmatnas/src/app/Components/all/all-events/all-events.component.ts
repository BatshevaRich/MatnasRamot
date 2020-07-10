import { Component, OnInit, ViewChild, Input, AfterViewInit, OnDestroy, ElementRef } from '@angular/core';
import { Eventt } from '../../../Classes/Eventt';
import { EventService } from '../../../services/event.service';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { Observable } from 'rxjs';
import { ConfirmDialogModel, ConfirmDialogComponent } from '../../UI/confirm-dialog/confirm-dialog.component';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { AddVEComponent } from '../../forms/add/add-ve/add-ve.component';
import { NotificationService } from '../../../services/notification.service';
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
  @ViewChild(MatTable, {static: false}) table: MatTable<any>;
  @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;
  displayedColumns = ['showDetails', 'Name', 'Description', 'StartDate', 'EndDate', 'addvolunteer', 'columndelete'];
  expandedElement: Details | null;
  dataSource = new MatTableDataSource([]);
  resultsLength = 0;
  @Input() vId: number;
  result = '';
  loaded = false;
  error = false;
  notFound = false;

  constructor(public es: EventService,
              public dialog: MatDialog,
              public ns: NotificationService,
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
        this.eventts = this.es.trimResultsFromDB(events);
        const res = this.ns.Events;
        function sortFunc(a: { Id: number; }, b: { Id: number; }) {
          const s1 = res.find(s => s.Id === a.Id);
          const s2 = res.find(s => s.Id === b.Id);
          if (s1 && s2) { return 0; }
          else if (s1) { return -1; }
          else if (s2) { return 1; }
          return 0;
        }
        const sorted = events.sort(sortFunc);
        for (let index = 0; index < res.length; index++) {
          sorted[index].color = true;
        }
        this.eventts = events;
        this.dataSource = new MatTableDataSource(Object.values(sorted));
        this.resultsLength = this.dataSource.data.length;
        this.loaded = true;
        this.error = false;
      }
    }, err => { this.error = true; this.loaded = true; });
  }

  confirmDialog(): Observable<any> {
    const message = `מחיקה זו היא לצמיתות, ותמחק את כל המקומות בהן קיים ארוע זה (לדוג' אצל מתנדבת)! האם תרצי להמשיך?`;
    const dialogData = new ConfirmDialogModel('מחיקת ארוע', message);
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      maxWidth: '75%',
      data: dialogData
    });
    return dialogRef.afterClosed();
  }

  delete(event: Details) {
    this.confirmDialog().subscribe(res => {
      this.result = res;
      if (res) {
        // this.os.removeVolunteer(elm.Id);
        // this.dataSource = new MatTableDataSource(Object.values(this.dataSource)
        //   .filter(i => i !== elm));
        // .map((i, idx) => (i.position = (idx + 1), i));
      }
    });
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }

  showDetails(element: Eventt) {
    element.show = !element.show;
  }

  updateTable(event: Eventt) {
    this.dataSource = new MatTableDataSource(Object.values(this.dataSource)
    .map((item: Eventt) => item.Id === event.Id ? this.es.trimResultFromUpdate(event) : item));
    this.table.renderRows();
  }

  addVolunteer(event: Details) {
    const dialogRef = this.dialog.open(AddVEComponent, {
      maxWidth: '75%',
      data: {
        id: event.Id,
        type: 'event',
        eventt: event
      }
    });
    dialogRef.afterClosed().subscribe(id => {
      if (id) {
        const removeIndex = this.ns.Events.map((item) => item.Id).indexOf(id);
        this.dataSource.data[removeIndex].color = false;
        // tslint:disable-next-line: no-bitwise
        const removed = ~removeIndex && this.ns.Events.splice(removeIndex, 1);
        const res = this.ns.Events;
        function sortFunc(a: { Id: number; }, b: { Id: number; }) {
          const s1 = res.find(s => s.Id === a.Id);
          const s2 = res.find(s => s.Id === b.Id);
          if (s1 && s2) { return 0; }
          else if (s1) { return -1; }
          else if (s2) { return 1; }
          return 0;
        }
        const sorted = this.dataSource.data.sort(sortFunc);
        for (let index = 0; index < res.length; index++) {
          sorted[index].color = true;
        }
        this.dataSource.data = sorted;
        this.ns.Events = sorted;
      }
    });
    return dialogRef.afterClosed();
  }

}

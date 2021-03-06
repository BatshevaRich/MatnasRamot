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
import { DatePipe } from '@angular/common';
import * as XLSX from 'xlsx';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Category } from '../../../Classes/Category';
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
  @ViewChild(MatTable, { static: false }) table: MatTable<any>;
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  displayedColumns = ['showDetails', 'Name', 'Description', 'StartDate', 'EndDate', 'addvolunteer', 'columndelete'];
  expandedElement: Details | null;
  dataSource = new MatTableDataSource([]);
  resultsLength = 0;
  @Input() vId: number;
  @Input() where: number;
  result = '';
  loaded = false;
  error = false;
  notFound = false;
  arrayBuffer: any;
  fileUploaded: File;
  toUpdate: Eventt[] = [];
  toSave: Eventt[] = [];
  constructor(public es: EventService,
              public dialog: MatDialog,
              public ns: NotificationService,
              private datePipe: DatePipe,
              private elementRef: ElementRef,
              private snackBar: MatSnackBar) { }

  ngOnInit() {
    if (this.vId) {
    // remove delete function when displayes as inner component
      this.displayedColumns = ['Name', 'Description', 'StartDate', 'EndDate'];
    }
  }

  ngOnDestroy() {
    this.elementRef.nativeElement.remove();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    if (this.vId) {
      if (this.where === 1) {
        // in volunteer component
        this.es.getEventsForVolunteer(this.vId).subscribe((data: Eventt[]) => {
          this.loaded = true;
          if (data.length === 0) {
            this.notFound = true;
          } else {
            data = this.es.trimResultsFromDB(data);
            this.eventts = data;
            this.dataSource.data = data;
            this.resultsLength = this.dataSource.data.length;
            this.error = false;
          }
        }, err => { this.error = true; this.loaded = true; });
      }
    } else {
      this.loadTable();
    }
  }

  loadTable() {
    this.ns.getAllEventsToConnect();
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
        this.dataSource.data = sorted;
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
        this.es.removeEvent(event.Id).subscribe(() => {
          this.dataSource.data = this.dataSource.data
          .filter(i => i !== event); },
           (err) => {console.log(err.message); alert('בעיה במחיקת הארוע. נסי שוב מאוחר יותר'); } );
        this.removeFromBadge(event.Id);
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
    this.loadTable();
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
        this.removeFromBadge(id);
      }
    });
    return dialogRef.afterClosed();
  }

  removeFromBadge(id: number) {
    const removeIndex = this.ns.Events.map((item) => item.Id).indexOf(id);
    if (this.dataSource.data[removeIndex]) {
      this.dataSource.data[removeIndex].color = false;
    }
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
  }

  public exportTableToExcel() {
    const data = this.eventts.map((x: Eventt) => ({
      Id: x.Id,
      שם: x.Name,
      תאור: x.Description,
      תאריך_התחלה: this.datePipe.transform(x.StartDate, 'MM/dd/yyyy'),
      תאריך_סיום: this.datePipe.transform(x.EndDate, 'MM/dd/yyyy'),
      תאריך_הוספה: this.datePipe.transform(x.DateAdded, 'MM/dd/yyyy')
    }));
    const wb = XLSX.utils.book_new();
    const ws = XLSX.utils.json_to_sheet(data);
    ws['!cols'] = []; // hide id column
    ws['!cols'][0] = { hidden: true };
    XLSX.utils.book_append_sheet(wb, ws, 'ארועים');
    XLSX.writeFile(wb, `ארועים.xlsx`);
  }

  uploadedFile(event) {
    this.fileUploaded = event.target.files[0];
    this.readExcel();
  }
  readExcel() {
    const readFile = new FileReader();
    readFile.onload = (e) => {
      this.arrayBuffer = readFile.result;
      const data = new Uint8Array(this.arrayBuffer);
      const arr = new Array();
      for (let i = 0; i !== data.length; ++i) { arr[i] = String.fromCharCode(data[i]); }
      const bstr = arr.join('');
      const workbook = XLSX.read(bstr, { type: 'binary' });
      const firstSheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[firstSheetName];
      XLSX.utils.sheet_to_json(worksheet, { raw: true });
      let js = XLSX.utils.sheet_to_json(worksheet, { raw: true });
      js = js as Details[];
      // tslint:disable-next-line: no-string-literal
      if (!js[1]['שם']) {
        this.snackBar.open('קובץ לא תקני, נא להעלות קובץ נכון...', 'OK', {
          duration: 5000,
          direction: 'rtl'
        });
      } else {
        const newData = js.map((x) => ({
          // tslint:disable-next-line: no-string-literal
          Id: x['Id'] as number,
          // tslint:disable-next-line: no-string-literal
          Name: x['שם'],
          // tslint:disable-next-line: no-string-literal
          Description: x['תאור'],
          // tslint:disable-next-line: no-string-literal
          StartDate: x['תאריך_התחלה'] ? this.datePipe.transform(new Date(x['תאריך_התחלה']).toDateString(), 'MM/dd/yyyy') : new Date(),
          // tslint:disable-next-line: no-string-literal
          EndDate: x['תאריך_סיום'] ? this.datePipe.transform(new Date(x['תאריך_סיום']).toDateString(), 'MM/dd/yyyy') : new Date(),
          // tslint:disable-next-line: no-string-literal
          DateAdded: x['תאריך_הוספה'] ? this.datePipe.transform(new Date(x['תאריך_הוספה']).toDateString(), 'MM/dd/yyyy') : new Date(),
        }));
        newData.forEach((element) => {
          if (element.Id) {
            this.toUpdate.push(Object.assign(element));
          } else {
            this.toSave.push(Object.assign(element));
          }
        });
        const cats: Category[] = [];
        if (this.toSave.length > 0) {
          this.confirmDialogAdd().subscribe(res => {
            if (res === false) {
              this.snackBar.open('לא מתבצעת הוספה', 'OK', {
                duration: 2000,
                direction: 'rtl'
              });
            } else {
              if (res) {
                res.forEach((element: Eventt) => {
                  this.es.addEvent(element, cats);
                });
                this.loadTable();
              }
            }
          });
        }
        if (this.toUpdate.length > 0) {
          this.confirmDialogUpdate().subscribe(res => {
            if (res === false) {
              this.snackBar.open('לא מתבצעת הוספה', 'OK', {
                duration: 2000,
                direction: 'rtl'
              });
            } else {
              if (res) {
                res.forEach((element: Eventt) => {
                  this.es.updateEvent(element, cats);
                });
                this.loadTable();
              }
            }
          });
        }
        this.snackBar.open('קובץ נטען בהצלחה', 'OK', {
          duration: 5000,
          direction: 'rtl'
        });
      }
    };
    readFile.readAsArrayBuffer(this.fileUploaded);
  }

  confirmDialogAdd(): Observable<any> {
    const message = `האם תרצי להוסיף את הארועים הבאים?`;
    const dialogData = new ConfirmDialogModel('הוספת ארועים חדשים', message, this.toSave, 'event');
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      maxWidth: '75%',
      data: dialogData
    });
    return dialogRef.afterClosed();
  }

  confirmDialogUpdate(): Observable<any> {
    const message = `האם תרצי לעדכן את הארועים הבאים?`;
    const dialogData = new ConfirmDialogModel('עדכון ארועים מקובץ', message, this.toUpdate, 'event');
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      maxWidth: '75%',
      data: dialogData
    });
    return dialogRef.afterClosed();
  }

}

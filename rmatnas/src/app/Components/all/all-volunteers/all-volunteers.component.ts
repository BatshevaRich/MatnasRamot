import { Component, OnInit, ViewChild, AfterViewInit, Input, ElementRef, OnDestroy } from '@angular/core';
import { Volunteer } from '../../../Classes/Volunteer';
import { VolunteerService } from '../../../services/volunteer.service';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource, MatTable } from '@angular/material/table';
import { ConfirmDialogModel, ConfirmDialogComponent } from '../../UI/confirm-dialog/confirm-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { Observable } from 'rxjs';
import * as XLSX from 'xlsx';
import { DatePipe } from '@angular/common';
import { AddVFComponent } from '../../forms/add/add-vf/add-vf.component';
import { Category } from '../../../Classes/Category';
export interface Details {
  Id: number;
  Name: string;
  Address: string;
  Pelephone: string;
  Email: string;
  Age: Date;
  IsActive: boolean;
}

@Component({
  selector: 'app-all-volunteers',
  templateUrl: './all-volunteers.component.html',
  styleUrls: ['./all-volunteers.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class AllVolunteersComponent implements OnInit, OnDestroy, AfterViewInit {
  arrayBuffer: any;
  displayedColumns = ['showDetails', 'Name', 'Address', 'Pelephone', 'Email', 'Age', 'IsActive', 'columnadd', 'columndelete'];
  expandedElement: Details | null;
  volunteers: any;
  dataSource = new MatTableDataSource([]);
  search = '';
  resultsLength = 0;
  @Input() vId: number;
  @Input() where: number;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatTable, { static: false }) table: MatTable<any>;
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  result = '';
  loaded = false;
  error = false;
  notFound = false;
  toUpdate: Volunteer[] = [];
  toSave: Volunteer[] = [];
  fileUploaded: File;
  worksheet: any;
  volunteerData: any;

  constructor(public vs: VolunteerService,
              public dialog: MatDialog,
              private datePipe: DatePipe,
              private elementRef: ElementRef,
              private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    if (this.vId) {
      // remove delete function when displayes as inner component
      this.displayedColumns = ['Name', 'Address', 'Pelephone', 'Email', 'Age', 'IsActive'];
    }
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    if (this.vId) {
      if (this.where === 4) {
        // in event component
        this.vs.getVolunteersForEvent(this.vId).subscribe((data: Volunteer[]) => {
          this.loaded = true;
          if (data.length === 0) {
            this.notFound = true;
          } else {
            data = this.vs.trimResultsFromDB(data);
            this.volunteers = data;
            this.dataSource.data = data;
            this.resultsLength = this.dataSource.data.length;
          }
        });
      } else if (this.where === 2) {
        // family component
        this.vs.getVolunteersForFamily(this.vId).subscribe((data: Volunteer[]) => {
          this.loaded = true;
          if (data.length === 0) {
            this.notFound = true;
          } else {
            data = this.vs.trimResultsFromDB(data);
            this.volunteers = data;
            this.dataSource.data = data;
            this.resultsLength = this.dataSource.data.length;
          }
        });
      }
    } else {
      // main component
      this.loadTable();
    }
  }

  delete(elm: Details) {
    this.confirmDialog().subscribe(res => {
      this.result = res;
      if (res) {
        this.vs.removeVolunteer(elm.Id).subscribe(() => {
          this.dataSource.data = this.dataSource.data
          .filter(i => i !== elm); },
           (err) => {console.log(err.message); alert('בעיה במחיקת המתנדבת. נסי שוב מאוחר יותר'); } );
      }
    });
  }

  showDetails(element: Volunteer) {
    // open individual component
    element.show = !element.show;
  }

  ngOnDestroy() {
    this.elementRef.nativeElement.remove();
  }

  confirmDialog(): Observable<any> {
    // dialog for user
    const message = `מחיקה זו היא לצמיתות! האם תרצי להמשיך?`;
    const dialogData = new ConfirmDialogModel('מחיקת מתנדבת', message);
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      maxWidth: '75%',
      data: dialogData
    });
    return dialogRef.afterClosed();
  }

  public CalculateAge(element: Details) {
    const birthday = new Date(element.Age);
    const timeDiff = Math.abs(Date.now() - birthday.getTime());
    return Math.floor((timeDiff / (1000 * 3600 * 24)) / 365.25);
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }

  public exportTableToExcel() {
    const data = this.volunteers.map((x: Volunteer) => ({
      Id: x.Id,
      שם: x.Name,
      כתובת: x.Address,
      טלפון: x.Telephone,
      פלאפון: x.Pelephone,
      מייל: x.Email,
      תאריך_לידה: this.datePipe.transform(x.Age, 'MM/dd/yyyy'),
      פעילה: x.IsActive === true ? 'כן' : 'לא',
      הערות: x.Comments
    })); // map fields to hebrew for excel file column titles
    const wb = XLSX.utils.book_new();
    const ws = XLSX.utils.json_to_sheet(data);
    ws['!cols'] = []; // hide id column
    ws['!cols'][0] = { hidden: true };
    XLSX.utils.book_append_sheet(wb, ws, 'מתנדבות');
    XLSX.writeFile(wb, `מתנדבות.xlsx`);
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
        // map excel file by hebrew column names
        const newData = js.map((x) => ({
          // tslint:disable-next-line: no-string-literal
          Id: x['Id'] as number,
          // tslint:disable-next-line: no-string-literal
          Name: x['שם'],
          // tslint:disable-next-line: no-string-literal
          Address: x['כתובת'],
          // tslint:disable-next-line: no-string-literal
          Telephone: x['טלפון'],
          // tslint:disable-next-line: no-string-literal
          Pelephone: x['פלאפון'],
          // tslint:disable-next-line: no-string-literal
          Email: x['מייל'],
          // tslint:disable-next-line: no-string-literal
          Age: x['תאריך_לידה'] ? this.datePipe.transform(new Date(x['תאריך_לידה']).toDateString(), 'MM/dd/yyyy') : new Date(),
          // tslint:disable-next-line: no-string-literal
          IsActive: x['פעילה'] === 'כן' ? true : false,
          // tslint:disable-next-line: no-string-literal
          Comments: x['הערות']
        }));
        newData.forEach((element) => {
          // if item has id, it needs to be updated. otherwise, new item.
          if (element.Id) {
            this.toUpdate.push(Object.assign(element));
          } else {
            this.toSave.push(Object.assign(element));
          }
        });
        const cats: Category[] = [];
        if (this.toSave.length > 0) { // if user authorized save
          this.confirmDialogAdd().subscribe(res => {
            if (res === false) {
              this.snackBar.open('לא מתבצעת הוספה', 'OK', {
                duration: 2000,
                direction: 'rtl'
              });
            } else {
              if (res) { // add new items to db
                res.forEach((element: Volunteer) => {
                  this.vs.addVolunteer(element, cats);
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
                res.forEach((element: Volunteer) => {
                  this.vs.updateVolunteer(element, cats);
                });
                this.loadTable();
              }
            }
          });
          this.snackBar.open('קובץ נטען בהצלחה', 'OK', {
            duration: 5000,
            direction: 'rtl'
          });
        }
      }
    };
    readFile.readAsArrayBuffer(this.fileUploaded);
  }

  loadTable() {
    this.vs.getVolunteers().subscribe((volunteers: Volunteer[]) => {
      volunteers = this.vs.trimResultsFromDB(volunteers);
      this.volunteers = volunteers;
      this.dataSource.data = volunteers;
      this.resultsLength = this.dataSource.data.length;
      this.table.renderRows();
      this.loaded = true;
      this.error = false;
    }, err => { this.error = true; this.loaded = true; });
  }

  updateTable(event: Volunteer) {
    // update table after update of item
    this.dataSource.data =
      this.dataSource.data
        .map((item: Volunteer) => item.Id === event.Id ? this.vs.trimResultFromUpdate(event) : item);
    this.table.renderRows();
  }

  addVolunteering(event: Details) {
    // add volunteer action, send id, type and item
    const dialogRef = this.dialog.open(AddVFComponent, {
      maxWidth: '75%',
      data: {
        id: event.Id,
        type: 'volunteer',
        volunteer: event
      }
    });
    return dialogRef.afterClosed();
  }
  confirmDialogAdd(): Observable<any> {
    // confirm adding from file
    const message = `האם תרצי להוסיף את המתנדבות הבאות?`;
    const dialogData = new ConfirmDialogModel('הוספת מתנדבות חדשות', message, this.toSave, 'volunteer');
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      maxWidth: '75%',
      data: dialogData
    });
    return dialogRef.afterClosed();
  }

  confirmDialogUpdate(): Observable<any> {
    // confirm updating from file
    const message = `האם תרצי לעדכן את המתנדבות הבאות?`;
    const dialogData = new ConfirmDialogModel('עדכון מתנדבות מקובץ', message, this.toUpdate, 'volunteer');
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      maxWidth: '75%',
      data: dialogData
    });
    return dialogRef.afterClosed();
  }
}


import { Component, OnInit, Input, ViewChild, ChangeDetectorRef, AfterViewInit, OnDestroy, ElementRef } from '@angular/core';
import { Family } from '../../../Classes/Family';
import { FamilyService } from '../../../services/family.service';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource, MatTable } from '@angular/material/table';
import { Observable } from 'rxjs';
import { ConfirmDialogModel, ConfirmDialogComponent } from '../../UI/confirm-dialog/confirm-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import * as XLSX from 'xlsx';
import { AddVFComponent } from '../../forms/add/add-vf/add-vf.component';
import { NotificationService } from '../../../services/notification.service';
import { Category } from '../../../Classes/Category';

export interface Details {
  Id: number;
  LastName: string;
  Address: string;
  Telephone: string;
  NumChildren: number;
  Status: string;
  Reference: string;
}

@Component({
  selector: 'app-all-families',
  templateUrl: './all-families.component.html',
  styleUrls: ['./all-families.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class AllFamiliesComponent implements OnInit, OnDestroy, AfterViewInit {
  constructor(public fs: FamilyService,
              public ns: NotificationService,
              private changeDetectorRefs: ChangeDetectorRef,
              public dialog: MatDialog,
              private elementRef: ElementRef,
              private snackBar: MatSnackBar) { }
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatTable, { static: false }) table: MatTable<any>;
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  displayedColumns = ['showDetails', 'LastName', 'Address', 'Telephone', 'NumChildren', 'Status', 'Reference', 'columnadd', 'columndelete'];
  expandedElement: Details | null;
  families: Family[] = [];
  dataSource = new MatTableDataSource([]);
  search = '';
  resultsLength = 0;
  @Input() vId: number;
  @Input() where: number;
  result = '';
  loaded = false;
  error = false;
  notFound = false;
  fileUploaded: File;
  worksheet: any;
  volunteerData: any;
  arrayBuffer: any;
  familiesToConnect: Family[] = [];
  toUpdate: Family[] = [];
  toSave: Family[] = [];
  ngOnInit() {
    if (this.vId) {
      this.displayedColumns = ['LastName', 'Address', 'Telephone', 'NumChildren', 'Status', 'Reference'];
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
        this.fs.getFamiliesByVolunteer(this.vId).subscribe((data: Family[]) => {
          this.loaded = true;
          if (data.length === 0) {
            this.notFound = true;
          } else {
            data = this.fs.trimResultsFromDB(data);
            this.families = data;
            this.dataSource.data = data;
            this.resultsLength = this.dataSource.data.length;
            this.error = false;
          }
        }, err => { this.error = true; this.loaded = true; });
      } else if (this.where === 3) {
        this.fs.getFamiliesByOrganization(this.vId).subscribe((data: Family[]) => {
          this.loaded = true;
          if (data.length === 0) {
            this.notFound = true;
          } else {
            data = this.fs.trimResultsFromDB(data);
            this.families = data;
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

  newFamily(family: Family) {
    this.families.push(family);
    this.dataSource.data = this.families;
    this.table.renderRows();
    this.changeDetectorRefs.detectChanges();
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }

  delete(elm: Details) {
    this.confirmDialog().subscribe(res => {
      this.result = res;
      if (res) {
        this.fs.removeFamily(elm.Id).subscribe(() => {
          this.dataSource.data = this.dataSource.data
            .filter(i => i !== elm);
        }, (err) => { console.log(err.message); alert('בעיה במחיקת המשפחה. נסי שוב מאוחר יותר'); });
        this.removeFromBadge(elm.Id);
      }
    });
  }

  confirmDialog(): Observable<any> {
    const message = `מחיקה זו היא לצמיתות! האם תרצי להמשיך?`;
    const dialogData = new ConfirmDialogModel('מחיקת משפחה', message);
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      maxWidth: '75%',
      data: dialogData
    });
    return dialogRef.afterClosed();
  }

  public exportTableToExcel() {
    const data = this.families.map(x => ({
      Id: x.Id,
      שם_משפחה: x.LastName,
      אבא: x.FirstNameFather,
      אמא: x.FirstNameMother,
      כתובת: x.Address,
      טלפון: x.Telephone,
      פלאפון_אבא: x.PelephoneFather,
      פלאפון_אמא: x.PelephoneMother,
      מספר_ילדים: x.NumChildren,
      סטטוס: x.Status,
      הפניה: x.Reference,
      סיבה: x.Reason
    }));
    const wb = XLSX.utils.book_new();
    const ws = XLSX.utils.json_to_sheet(data);
    ws['!cols'] = []; // hide id column
    ws['!cols'][0] = { hidden: true };
    XLSX.utils.book_append_sheet(wb, ws, 'משפחות');
    XLSX.writeFile(wb, `משפחות.xlsx`);
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
      if (!js[1]['שם_משפחה']) {
        this.snackBar.open('קובץ לא תקני, נא להעלות קובץ נכון...', 'OK', {
          duration: 5000,
          direction: 'rtl'
        });
      } else {
        const newData = js.map((x) => ({
          // tslint:disable-next-line: no-string-literal
          Id: x['Id'] as number,
          // tslint:disable-next-line: no-string-literal
          LastName: x['שם_משפחה'],
          // tslint:disable-next-line: no-string-literal
          FirstNameFather: x['אבא'],
          // tslint:disable-next-line: no-string-literal
          FirstNameMother: x['אמא'],
          // tslint:disable-next-line: no-string-literal
          Address: x['כתובת'],
          // tslint:disable-next-line: no-string-literal
          Telephone: x['טלפון'],
          // tslint:disable-next-line: no-string-literal
          PelephoneFather: x['פלאפון_אבא'],
          // tslint:disable-next-line: no-string-literal
          PelephoneMother: x['פלאפון_אמא'],
          // tslint:disable-next-line: no-string-literal
          NumChildren: x['מספר_ילדים'],
          // tslint:disable-next-line: no-string-literal
          Status: x['סטטוס'],
          // tslint:disable-next-line: no-string-literal
          Reference: x['הפניה'],
          // tslint:disable-next-line: no-string-literal
          Reason: x['סיבה']
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
                res.forEach((element: Family) => {
                  this.fs.addFamily(element, cats);
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
                res.forEach((element: Family) => {
                  this.fs.updateFamily(element, cats);
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

  confirmDialogAdd(): Observable<any> {
    const message = `האם תרצי להוסיף את המתנדבות הבאות?`;
    const dialogData = new ConfirmDialogModel('הוספת מתנדבות חדשות', message, this.toSave, 'family');
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      maxWidth: '75%',
      data: dialogData
    });
    return dialogRef.afterClosed();
  }

  confirmDialogUpdate(): Observable<any> {
    const message = `האם תרצי לעדכן את המתנדבות הבאות?`;
    const dialogData = new ConfirmDialogModel('עדכון מתנדבות מקובץ', message, this.toUpdate, 'family');
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      maxWidth: '75%',
      data: dialogData
    });
    return dialogRef.afterClosed();
  }

  showDetails(element: Family) {
    element.show = !element.show;
  }

  loadTable() {
    this.ns.getAllFamiliesToConnect();
    this.fs.getFamilies().subscribe((data: Family[]) => {
      data = this.fs.trimResultsFromDB(data);
      const res = this.ns.Families;
      function sortFunc(a: { Id: number; }, b: { Id: number; }) {
        const s1 = res.find(s => s.Id === a.Id);
        const s2 = res.find(s => s.Id === b.Id);
        if (s1 && s2) { return 0; }
        else if (s1) { return -1; }
        else if (s2) { return 1; }
        return 0;
      }
      const sorted = data.sort(sortFunc);
      for (let index = 0; index < res.length; index++) {
        sorted[index].color = true;
      }
      this.families = data;
      this.dataSource.data = sorted;
      this.resultsLength = this.dataSource.data.length;
      this.loaded = true;
      this.error = false;
    }, () => { this.error = true; this.loaded = true; });
  }

  updateTable(event: Family) {
    this.loadTable();
  }

  addVolunteering(event: Details) {
    const dialogRef = this.dialog.open(AddVFComponent, {
      maxWidth: '75%',
      data: {
        id: event.Id,
        type: 'family',
        family: event
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
    const removeIndex = this.ns.Families.map((item) => item.Id).indexOf(id);
    if (this.dataSource.data[removeIndex]) {
      this.dataSource.data[removeIndex].color = false;
    }
    // tslint:disable-next-line: no-bitwise
    const removed = ~removeIndex && this.ns.Families.splice(removeIndex, 1);
    const res = this.ns.Families;
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
    this.table.renderRows();
  }
}

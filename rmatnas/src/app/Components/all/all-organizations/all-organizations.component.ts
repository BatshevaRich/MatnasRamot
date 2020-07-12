import { Component, OnInit, ViewChild, Input, AfterViewInit, OnDestroy, ElementRef } from '@angular/core';
import { Organization } from '../../../Classes/Organization';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { OrganizationService } from '../../../services/organization.service';
import { Observable } from 'rxjs';
import { ConfirmDialogModel, ConfirmDialogComponent } from '../../UI/confirm-dialog/confirm-dialog.component';
import { AddFOComponent } from '../../forms/add/add-fo/add-fo.component';
import * as XLSX from 'xlsx';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Category } from '../../../Classes/Category';
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
  @ViewChild(MatTable, {static: false}) table: MatTable<any>;
  @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;
  displayedColumns = ['showDetails', 'Name', 'Contact', 'Phone', 'Address', 'Email', 'addFamily', 'columndelete'];
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
  toUpdate: Organization[] = [];
  toSave: Organization[] = [];
  fileUploaded: File;
  constructor(public os: OrganizationService,
              public dialog: MatDialog,
              private elementRef: ElementRef,
              private snackBar: MatSnackBar) { }

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
      this.os.getOrganizationsForFamily(this.vId).subscribe((data: Organization[]) => {
        this.loaded = true;
        if (data.length === 0) {
          this.notFound = true;
        } else {
          this.organizations = this.os.trimResultsFromDB(data);
          this.dataSource.data = data;
          this.resultsLength = this.dataSource.data.length;
        }
      });
    } else {
      this.loadTable();
    }
  }

  loadTable() {
    this.os.getOrganizations().subscribe((organizations: Organization[]) => {
      this.loaded = true;
      if (organizations.length === 0) {
        this.notFound = true;
      } else {
        this.organizations = this.os.trimResultsFromDB(organizations);
        this.dataSource.data = organizations;
        this.resultsLength = this.dataSource.data.length;
        this.error = false;
      }
    }, err => { this.error = true; this.loaded = true; });
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

  delete(elm: Details) {
    this.confirmDialog().subscribe(res => {
      this.result = res;
      if (res) {
        this.os.removeOrganization(elm.Id);
        this.dataSource = new MatTableDataSource(Object.values(this.dataSource.data)
          .filter(i => i !== elm));
        // .map((i, idx) => (i.position = (idx + 1), i));
      }
    });
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }

  showDetails(element: Organization) {
    element.show = !element.show;
  }

  addFamily(event) {
    const dialogRef = this.dialog.open(AddFOComponent, {
      maxWidth: '75%',
      data: {
        id: event.Id,
        organization: event
      }
    });
    return dialogRef.afterClosed();
  }

  updateTable(event: Organization) {
    this.dataSource.data =
    this.dataSource.data.map((item: Organization) => item.Id === event.Id ? this.os.trimResultFromUpdate(event) : item);
    this.table.renderRows();
  }

  public exportTableToExcel() {
    const data = this.organizations.map((x: Organization) => ({
      Id: x.Id,
      שם: x.Name,
      איש_קשר: x.Contact,
      טלפון: x.Phone,
      כתובת: x.Address,
      מייל: x.email,
      הערות: x.Comments
    }));
    const wb = XLSX.utils.book_new();
    const ws = XLSX.utils.json_to_sheet(data);
    ws['!cols'] = []; // hide id column
    ws['!cols'][0] = { hidden: true };
    XLSX.utils.book_append_sheet(wb, ws, 'ארגונים');
    XLSX.writeFile(wb, `ארגונים.xlsx`);
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
      if (!js[2]['איש_קשר']) {
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
          Address: x['כתובת'],
          // tslint:disable-next-line: no-string-literal
          Phone: x['טלפון'],
          // tslint:disable-next-line: no-string-literal
          Contact: x['איש_קשר'],
          // tslint:disable-next-line: no-string-literal
          email: x['מייל'],
          // tslint:disable-next-line: no-string-literal
          Comments: x['הערות']
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
          if (res === false){
            this.snackBar.open('לא מתבצעת הוספה', 'OK', {
              duration: 2000,
              direction: 'rtl'
            });
          } else {
            if (res) {
              res.forEach((element: Organization) => {
              this.os.addOrganization(element, cats);
            });
              this.loadTable();
          }
          }
        });
      }
        if (this.toUpdate.length > 0) {
        this.confirmDialogUpdate().subscribe(res => {
          if (res === false){
            this.snackBar.open('לא מתבצעת הוספה', 'OK', {
              duration: 2000,
              direction: 'rtl'
            });
          } else {
            if (res) {
              res.forEach((element: Organization) => {
             this.os.updateOrganization(element, cats);
            });
              this.loadTable();
          }
          }
        });
        console.log(newData);
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
    const message = `האם תרצי להוסיף את הארגונים הבאים?`;
    const dialogData = new ConfirmDialogModel('הוספת ארגונים חדשים', message, this.toSave, 'organization');
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      maxWidth: '75%',
      data: dialogData
    });
    return dialogRef.afterClosed();
  }

  confirmDialogUpdate(): Observable<any> {
    const message = `האם תרצי לעדכן את הארגונים הבאים?`;
    const dialogData = new ConfirmDialogModel('עדכון ארגונים מקובץ', message, this.toUpdate, 'organization');
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      maxWidth: '75%',
      data: dialogData
    });
    return dialogRef.afterClosed();
  }

}

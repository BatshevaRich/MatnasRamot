import { Component, OnInit, Input, ViewChild, ChangeDetectorRef, AfterViewChecked, AfterViewInit } from '@angular/core';
import { Family } from '../../../Classes/Family';
import { FamilyService } from 'src/app/services/family.service';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource, MatTable } from '@angular/material/table';
import { Observable } from 'rxjs';
import { ConfirmDialogModel, ConfirmDialogComponent } from '../../forms/confirm-dialog/confirm-dialog.component';
import { MatDialog } from '@angular/material';
import * as XLSX from 'xlsx';

export interface Details {
  Id: number;
  LastName: string;
  Address: string;
  Telephone: string;
  // Pelephone: string;
  // Email: string;
  // Age: Date;
  // Comments: string;
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
export class AllFamiliesComponent implements OnInit, AfterViewInit {

  @ViewChild(MatTable) table: MatTable<any>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  displayedColumns = ['LastName', 'Address', 'Telephone', 'NumChildren', 'Status', 'Reference', 'columndelete'];
  expandedElement: Details | null;
  families: Family[] = [];
  dataSource = new MatTableDataSource();
  search = '';
  resultsLength = 0;
  @Input() vId: number;
  inp = false;
  result = '';

  constructor(public fs: FamilyService,
              private changeDetectorRefs: ChangeDetectorRef,
              public dialog: MatDialog) {
    this.dataSource.filterPredicate =
      (data: Details, filter: string) => data.LastName.indexOf(filter) !== -1;
  }
  ngOnInit() {
    if (this.vId) {
      this.displayedColumns = ['LastName', 'Address', 'Telephone', 'NumChildren', 'Status', 'Reference'];
      this.inp = true;
      this.fs.getFamiliesByVolunteer(this.vId).subscribe((data: Family[]) => {
        /// TODO: check if empty results, if empty- do not display table
        this.families = data;
        this.dataSource.data = data;
        console.log(this.dataSource);
        this.resultsLength = this.dataSource.data.length;
      });
    } else {
      this.fs.getFamilies().subscribe((data: Family[]) => {
        this.families = data;
        this.dataSource.data = data;
        console.log(this.dataSource);
        this.resultsLength = this.dataSource.data.length;
      });
    }
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  newFamily(family) {
    this.families.push(family);
    this.dataSource.data = this.families as unknown as MatTableDataSource<Details>[];
    console.log(this.dataSource);
    this.table.renderRows();
    this.changeDetectorRefs.detectChanges();
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }

  delete(event, elm) {
    this.confirmDialog().subscribe(res => {
      this.result = res;
      if (res) {
        this.fs.removeFamily(elm.Id);
        this.dataSource.data = this.dataSource.data
          .filter(i => i !== elm);
        // .map((i, idx) => (i.position = (idx + 1), i));
      }
    });
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

  public exportTableToExcel() {
    const data = this.families.map(x => ({
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
    XLSX.utils.book_append_sheet(wb, ws, 'משפחות');
    XLSX.writeFile(wb, `משפחות.xlsx`);
  }
}

import { Component, OnInit, Input, ViewChild, AfterViewInit, OnDestroy, ElementRef } from '@angular/core';
import { VolunteerAndFamilyService } from '../../../services/volunteer-and-family.service';
import { VolunteerAndFamily } from '../../../Classes/VolunteerAndFamily';
import { Family } from '../../../Classes/Family';
import { FamilyService } from '../../../services/family.service';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { ConfirmDialogModel, ConfirmDialogComponent } from '../../UI/confirm-dialog/confirm-dialog.component';
import * as XLSX from 'xlsx';
import { DatePipe } from '@angular/common';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-all-to-volunteers',
  templateUrl: './all-to-volunteers.component.html',
  styleUrls: ['./all-to-volunteers.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class AllToVolunteersComponent implements OnInit, OnDestroy, AfterViewInit {
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatTable, { static: false }) table: MatTable<any>;
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  displayedColumns = ['NameVolunteer', 'NameFamily', 'Category', 'PelephoneVolunteer', 'date', 'columndelete'];
  expandedElement: Details | null;
  allvolunteerings: Details[] = [];
  dataSource = new MatTableDataSource([]);
  search = '';
  resultsLength = 0;
  @Input() vId: number;
  @Input() where: number;
  volunteerings: VolunteerAndFamily[] = [];
  families: Family[] = [];
  result = '';
  loaded = false;
  error = false;
  notFound = false;

  constructor(public fs: FamilyService,
              public vfs: VolunteerAndFamilyService,
              public dialog: MatDialog,
              private datePipe: DatePipe,
              private elementRef: ElementRef) {
    // this.dataSource.filterPredicate =
    //   (data: Details, filter: string) => data.NameVolunteer.indexOf(filter) !== -1;
  }

  ngOnInit() {
    if (this.vId) {
      this.displayedColumns = ['NameVolunteer', 'NameFamily', 'Category', 'PelephoneVolunteer', 'date'];
      if (this.where === 1) {
        this.vfs.getVolunteeringsForVolunteer(this.vId).subscribe((res: VolunteerAndFamily[]) => {
          this.loaded = true;
          if (res.length === 0) {
            this.notFound = true;
          } else {
            this.volunteerings = res;
            this.resultsLength = this.volunteerings.length;
            this.mapData(this.volunteerings);
            this.dataSource = new MatTableDataSource(Object.values(this.allvolunteerings));
          }
        }, err => { this.error = true; this.loaded = true; });
      } else if (this.where === 2) {
        this.vfs.getVolunteeringsForFamily(this.vId).subscribe((res: VolunteerAndFamily[]) => {
          this.loaded = true;
          if (res.length === 0) {
            this.notFound = true;
          } else {
            this.volunteerings = res;
            this.resultsLength = this.volunteerings.length;
            this.mapData(this.volunteerings);
            this.dataSource.data = this.allvolunteerings;
          }
        }, err => { this.error = true; this.loaded = true; });
      }
    } else {
      this.vfs.getVolunteerings().subscribe((res: VolunteerAndFamily[]) => {
        this.loaded = true;
        if (res.length === 0) {
          this.notFound = true;
        } else {
          this.volunteerings = res;
          this.resultsLength = this.volunteerings.length;
          this.mapData(this.volunteerings);
          this.dataSource.data = this.allvolunteerings;
        }
      }, err => { this.error = true; this.loaded = true; });
    }
  }

  mapData(volunteerings: VolunteerAndFamily[]) {
    volunteerings.forEach(element => {
      // tslint:disable-next-line: no-use-before-declare
      const item = new Details();
      item.Id = element.Id;
      item.NameFamily = element.Family.LastName;
      item.NameVolunteer = element.Volunteer.Name;
      element.Category ? item.Category = element.Category.Name : item.Category = 'אין קטגוריה';
      item.PelephoneVolunteer = element.Volunteer.Pelephone;
      this.allvolunteerings.push(item);
      item.IdVolunteer = element.Volunteer.Id;
      item.IdFamily = element.Family.Id;
      item.DateVolunteer = this.datePipe.transform(new Date(element.DateAdded).toDateString(), 'MM/dd/yyyy');
    });
    return volunteerings;
  }
  ngOnDestroy() {
    this.elementRef.nativeElement.remove();
  }
  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
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
        this.vfs.removeVolunteering(elm.Id);
        this.dataSource.data = this.dataSource.data
          .filter(i => i !== elm);
        // .map((i, idx) => (i.position = (idx + 1), i));
      }
    });
  }

  confirmDialog(): Observable<any> {
    const message = `מחיקה זו היא לצמיתות! האם תרצי להמשיך?`;
    const dialogData = new ConfirmDialogModel('מחיקת התנדבות', message);
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      maxWidth: '75%',
      data: dialogData
    });
    return dialogRef.afterClosed();
  }

  public exportTableToExcel() {
    const data = this.allvolunteerings.map((x: Details) => ({
      שם_מתנדבת: x.NameVolunteer,
      שם_משפחה: x.NameFamily,
      קטגוריה: x.Category,
      פלאפון_מתנדבת: x.PelephoneVolunteer,
      תאריך_התנדבות: x.DateVolunteer
    }));
    const wb = XLSX.utils.book_new();
    const ws = XLSX.utils.json_to_sheet(data);
    XLSX.utils.book_append_sheet(wb, ws, 'התנדבויות');
    XLSX.writeFile(wb, `התנדבויות.xlsx`);
  }
}

// tslint:disable-next-line: max-classes-per-file
export class Details {
  Id: number;
  NameVolunteer: string;
  IdFamily: number;
  IdVolunteer: number;
  NameFamily: string;
  Category: string;
  PelephoneVolunteer: string;
  DateVolunteer: string;
}

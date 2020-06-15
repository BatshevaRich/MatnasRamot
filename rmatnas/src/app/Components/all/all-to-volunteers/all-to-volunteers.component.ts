import { Component, OnInit, Input, ViewChild, AfterViewInit, OnDestroy, ElementRef } from '@angular/core';
import { VolunteerAndFamilyService } from 'src/app/services/volunteer-and-family.service';
import { VolunteerAndFamily } from 'src/app/Classes/VolunteerAndFamily';
import { Family } from 'src/app/Classes/Family';
import { FamilyService } from 'src/app/services/family.service';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog } from '@angular/material';
import { Observable } from 'rxjs';
import { ConfirmDialogModel, ConfirmDialogComponent } from '../../UI/confirm-dialog/confirm-dialog.component';
import * as XLSX from 'xlsx';
import { DatePipe } from '@angular/common';

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

  @ViewChild(MatTable) table: MatTable<any>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  displayedColumns = ['NameVolunteer', 'NameFamily', 'Category', 'PelephoneVolunteer', 'columndelete'];
  expandedElement: Details | null;
  allvolunteerings: Details[] = [];
  dataSource = new MatTableDataSource([]);
  search = '';
  resultsLength = 0;
  @Input() vId: number;
  inp: boolean;
  volunteerings: VolunteerAndFamily[] = [];
  families: Family[] = [];
  result = '';
  loaded = false;
  error = false;
  notFound = false;

  constructor(public fs: FamilyService,
              public vfs: VolunteerAndFamilyService,
              public dialog: MatDialog,
              private elementRef: ElementRef) {
    // this.dataSource.filterPredicate =
    //   (data: Details, filter: string) => data.NameVolunteer.indexOf(filter) !== -1;
  }

  ngOnInit() {
    if (this.vId) {
      this.volunteerings = [];
      this.loaded = true;
      this.notFound = true;
      this.displayedColumns = ['NameVolunteer', 'NameFamily', 'Category', 'PelephoneVolunteer'];
     } else {
      this.vfs.getVolunteerings().subscribe(res => {
        this.loaded = true;
        if (res.length === 0) {
          this.notFound = true;
        } else {
          this.volunteerings = res;
          this.resultsLength = this.volunteerings.length;
          this.volunteerings.forEach(element => {
            // tslint:disable-next-line: no-use-before-declare
            const item = new Details();
            item.Id = element.Id;
            item.NameFamily = element.Family.LastName;
            item.NameVolunteer = element.Volunteer.Name;
            element.Category ? item.Category = element.Category.Name : item.Category = 'קטגוריה נמחקה';
            item.PelephoneVolunteer = element.Volunteer.Pelephone;
            this.allvolunteerings.push(item);
            item.IdVolunteer = element.Volunteer.Id;
            item.IdFamily = element.Family.Id;
          });
          this.dataSource.data = this.allvolunteerings;
        }
      }, err => { this.error = true; this.loaded = true; });
    }
  }
  ngOnDestroy() {
    this.elementRef.nativeElement.remove();
  }
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
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
    const data = this.allvolunteerings.map(x => ({
      שם_מתנדבת: x.NameVolunteer,
      שם_משפחה: x.NameFamily,
      קטגוריה: x.Category,
      פלאפון_מתנדבת: x.PelephoneVolunteer,
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
}

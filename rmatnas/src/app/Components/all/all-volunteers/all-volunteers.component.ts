import { Component, OnInit, ViewChild, AfterViewInit, Input, ElementRef, OnDestroy } from '@angular/core';
import { Volunteer } from '../../../Classes/Volunteer';
import { VolunteerService } from 'src/app/services/volunteer.service';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource, MatTable } from '@angular/material/table';
import { ConfirmDialogModel, ConfirmDialogComponent } from '../../UI/confirm-dialog/confirm-dialog.component';
import { MatDialog, MatSort, MatChipInputEvent } from '@angular/material';
import { Observable } from 'rxjs';
import * as XLSX from 'xlsx';
import { DatePipe } from '@angular/common';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
export interface Details {
  Id: number;
  Name: string;
  Address: string;
  Pelephone: string;
  Email: string;
  Age: Date;
  IsActive: boolean;
}
export interface Fruit {
  name: string;
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

  constructor(public vs: VolunteerService,
              public dialog: MatDialog,
              private datePipe: DatePipe,
              private elementRef: ElementRef) {
    // this.dataSource.filterPredicate =
    //   (data: Details, filter: string) => data.Name.indexOf(filter) !== -1;
  }
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatTable) table: MatTable<any>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  displayedColumns = ['showDetails', 'Name', 'Address', 'Pelephone', 'Email', 'Age', 'IsActive', 'columndelete'];
  expandedElement: Details | null;
  volunteers: any;
  dataSource = new MatTableDataSource([]);
  search = '';
  resultsLength = 0;
  @Input() vId: number;
  @Input() where: number;
  result = '';
  loaded = false;
  error = false;
  notFound = false;
  searchParams = ['volunteer, family, organization, event'];
  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];
  fruits: Fruit[] = [
    {name: 'אין משפחות'},
    {name: 'אין התנדבויות'},
    {name: 'אין ארועים'},
    {name: 'ותיקה'},
    {name: 'מתנדבת למס הכי גדול של ילדים'},

  ];

  add(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    // Add our fruit
    if ((value || '').trim()) {
      this.fruits.push({name: value.trim()});
    }

    // Reset the input value
    if (input) {
      input.value = '';
    }
  }

  remove(fruit: Fruit): void {
    const index = this.fruits.indexOf(fruit);

    if (index >= 0) {
      this.fruits.splice(index, 1);
    }
  }




  ngOnInit(): void {
    if (this.vId) {
      this.displayedColumns = ['Name', 'Address', 'Pelephone', 'Email', 'Age', 'IsActive'];
    }
  }

  trimResultsFromDB(volunteers: Volunteer[]) {
    for (const volunteer of volunteers) {
      volunteer.Name = volunteer.Name.trim();
      volunteer.Address == null ? volunteer.Address = '' : volunteer.Address = volunteer.Address.trim();
      volunteer.Telephone == null ? volunteer.Telephone = '' : volunteer.Telephone = volunteer.Telephone.trim();
      volunteer.Pelephone == null ? volunteer.Pelephone = '' : volunteer.Pelephone = volunteer.Pelephone.trim();
      volunteer.Email == null ? volunteer.Email = '' : volunteer.Email = volunteer.Email.trim();
      volunteer.Comments == null ? volunteer.Comments = '' : volunteer.Comments = volunteer.Comments.trim();
    }
    return volunteers;
  }

  trimResultFromUpdate(volunteer: Volunteer) {
    volunteer.Name = volunteer.Name.trim();
    volunteer.Address == null ? volunteer.Address = '' : volunteer.Address = volunteer.Address.trim();
    volunteer.Telephone == null ? volunteer.Telephone = '' : volunteer.Telephone = volunteer.Telephone.trim();
    volunteer.Pelephone == null ? volunteer.Pelephone = '' : volunteer.Pelephone = volunteer.Pelephone.trim();
    volunteer.Email == null ? volunteer.Email = '' : volunteer.Email = volunteer.Email.trim();
    volunteer.Comments == null ? volunteer.Comments = '' : volunteer.Comments = volunteer.Comments.trim();
    return volunteer;
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    if (this.vId) {
      if (this.where === 4) {
        this.vs.getVolunteersForEvent(this.vId).subscribe((data: Volunteer[]) => {
          this.loaded = true;
          if (data.length === 0) {
            this.notFound = true;
          } else {
            data = this.trimResultsFromDB(data);
            this.volunteers = data;
            this.dataSource.data = data;
            this.resultsLength = this.dataSource.data.length;
          }
        });
      } else if (this.where === 2) {
        this.vs.getVolunteersForFamily(this.vId).subscribe((data: Volunteer[]) => {
          this.loaded = true;
          if (data.length === 0) {
            this.notFound = true;
          } else {
            data = this.trimResultsFromDB(data);
            this.volunteers = data;
            this.dataSource.data = data;
            this.resultsLength = this.dataSource.data.length;
          }
        });
      }
    } else {
      this.vs.getVolunteers().subscribe((volunteers: Volunteer[]) => {
        volunteers = this.trimResultsFromDB(volunteers);
        this.volunteers = volunteers;
        this.dataSource.data = volunteers;
        this.resultsLength = this.dataSource.data.length;
        this.loaded = true;
        this.error = false;
      }, err => { this.error = true; this.loaded = true; });
    }
  }

  delete(elm: Details) {
    this.confirmDialog().subscribe(res => {
      this.result = res;
      if (res) {
        this.vs.removeVolunteer(elm.Id);
        this.dataSource.data = this.dataSource.data
          .filter(i => i !== elm);
        // .map((i, idx) => (i.position = (idx + 1), i));
      }
    });
  }
  showDetails(element: Volunteer) {
    element.show = !element.show;
  }
  ngOnDestroy() {
    this.elementRef.nativeElement.remove();
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
      שם: x.Name,
      כתובת: x.Address,
      טלפון: x.Telephone,
      פלאפון: x.Pelephone,
      מייל: x.Email,
      תאריך_לידה: this.datePipe.transform(x.Age, 'dd/mm/yyyy'),
      פעילה: x.IsActive === true ? 'כן' : 'לא',
      הערות: x.Comments
    }));
    const wb = XLSX.utils.book_new();
    const ws = XLSX.utils.json_to_sheet(data);
    XLSX.utils.book_append_sheet(wb, ws, 'מתנדבות');
    XLSX.writeFile(wb, `מתנדבות.xlsx`);
  }

  updateTable(event: Volunteer) {
    this.dataSource.data = this.dataSource.data.map((item: Volunteer) => item.Id === event.Id ? this.trimResultFromUpdate(event) : item);
    this.table.renderRows();
  }

}


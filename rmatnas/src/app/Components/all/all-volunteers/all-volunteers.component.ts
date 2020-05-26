import { Component, OnInit, ViewChild, ChangeDetectorRef, AfterViewInit, Input } from '@angular/core';
import { Volunteer } from '../../../Classes/Volunteer';
import { VolunteerService } from 'src/app/services/volunteer.service';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource, MatTable } from '@angular/material/table';
import { ConfirmDialogModel, ConfirmDialogComponent } from '../../forms/confirm-dialog/confirm-dialog.component';
import { MatDialog } from '@angular/material';
import { Observable } from 'rxjs';
// import { DialogBoxComponent } from './dialog-box/dialog-box.component';
export interface Details {
  Id: number;
  Name: string;
  Address: string;
  // Telephone: string;
  Pelephone: string;
  Email: string;
  Age: Date;
  // Comments: string;
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
export class AllVolunteersComponent implements OnInit, AfterViewInit {

  @ViewChild(MatTable) table: MatTable<any>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  displayedColumns = ['Name', 'Address', 'Pelephone', 'Email', 'Age', 'IsActive', 'columndelete'];
  expandedElement: Details | null;
  volunteers: any;
  dataSource = new MatTableDataSource();
  search = '';
  resultsLength = 0;
  @Input() vId: number;
  inp: boolean;
  result = '';

  constructor(public vs: VolunteerService, private changeDetectorRefs: ChangeDetectorRef, public dialog: MatDialog) {
    this.dataSource.filterPredicate =
      (data: Details, filter: string) => data.Name.indexOf(filter) !== -1;
  }
  ngOnInit(): void {
    if (this.vId) {
      this.inp = true;
      this.vs.getVolunteersForFamily(this.vId).subscribe(data => {
        /// TODO: check if empty results, if empty- do not display table
        this.volunteers = data;
        this.dataSource.data = data;
        console.log(this.dataSource);
        this.resultsLength = this.dataSource.data.length;
      });
    } else {
      this.vs.getVolunteers().subscribe((volunteers: Volunteer[]) => {
        this.volunteers = volunteers;
        this.dataSource.data = volunteers;
        this.resultsLength = this.dataSource.data.length;
      });
    }
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  delete(event, elm) {
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

  confirmDialog(): Observable<any> {
    const message = `מחיקה זו היא לצמיתות! האם תרצי להמשיך?`;

    const dialogData = new ConfirmDialogModel('מחיקת מתנדבת', message);

    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      maxWidth: '75%',
      data: dialogData
    });

    return dialogRef.afterClosed();

  }
  newVolunteer(myvolunteer) {
    this.volunteers.push(myvolunteer);
    this.dataSource.data = this.volunteers as unknown as MatTableDataSource<Details>[];
    console.log(this.dataSource);
    this.table.renderRows();
    this.changeDetectorRefs.detectChanges();
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

}


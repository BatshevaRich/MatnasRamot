import { Component, OnInit, Input, ViewChild, AfterViewInit } from '@angular/core';
import { VolunteerService } from 'src/app/services/volunteer.service';
import { Volunteer } from 'src/app/Classes/Volunteer';
import { VolunteerAndFamilyService } from 'src/app/services/volunteer-and-family.service';
import { VolunteerAndFamily } from 'src/app/Classes/VolunteerAndFamily';
import { Family } from 'src/app/Classes/Family';
import { FamilyService } from 'src/app/services/family.service';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog } from '@angular/material';
import { Observable } from 'rxjs';
import { ConfirmDialogModel, ConfirmDialogComponent } from '../../forms/confirm-dialog/confirm-dialog.component';

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
export class AllToVolunteersComponent implements OnInit, AfterViewInit {

  @ViewChild(MatTable) table: MatTable<any>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  displayedColumns = ['NameVolunteer', 'NameFamily', 'Category', 'PelephoneVolunteer', 'columndelete'];
  expandedElement: Details | null;
  allvolunteerings: Details[] = [];
  dataSource = new MatTableDataSource();
  search = '';
  resultsLength = 0;
  @Input() vId: number;
  inp: boolean;
  volunteerings: VolunteerAndFamily[] = [];
  families: Family[] = [];
  result = '';
  loaded = false;
  constructor(public fs: FamilyService,
              public vfs: VolunteerAndFamilyService,
              public dialog: MatDialog) {
    this.dataSource.filterPredicate =
      (data: Details, filter: string) => data.NameVolunteer.indexOf(filter) !== -1;
   }

  ngOnInit() {
    this.vfs.getVolunteerings().subscribe(res => {
      this.loaded = true;
      this.volunteerings = res;
      this.resultsLength = this.volunteerings.length;
      this.volunteerings.forEach(element => {
        const item = new Details();
        item.Id = element.Id;
        item.NameFamily = element.Family.LastName;
        item.NameVolunteer = element.Volunteer.Name;
        item.Category = element.Category.Name;
        item.PelephoneVolunteer = element.Volunteer.Pelephone;
        this.allvolunteerings.push(item);
        item.IdVolunteer = element.Volunteer.Id;
        item.IdFamily = element.Family.Id;
      });
      this.dataSource.data = this.allvolunteerings;
    });
    // if (this.vId) {
    //   this.fs.getFamiliesByVolunteer(this.vId).subscribe(data=>{
    //     this.families = data;
    //   })
    //  }
    // else {
    //   this.fs.getFamilies().subscribe(data => {
    //     this.families = data;
    //   });
    // }
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
    const dialogData = new ConfirmDialogModel('מחיקת מתנדבת', message);
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      maxWidth: '75%',
      data: dialogData
    });
    return dialogRef.afterClosed();
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

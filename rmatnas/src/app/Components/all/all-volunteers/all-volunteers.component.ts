import { Component, OnInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { Volunteer } from '../../../Classes/Volunteer';
import { VolunteerService } from 'src/app/services/volunteer.service';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource, MatTable } from '@angular/material/table';
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
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class AllVolunteersComponent implements OnInit {
  // dataSource = new MatTableDataSource<Details>();
  @ViewChild(MatTable, { static: false }) table: MatTable<any>;
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  displayedColumns = ['Name', 'Address', 'Pelephone', 'Email', 'Age', 'IsActive'];
  expandedElement: Details | null;
  volunteers: Volunteer[] = [];
  dataSource: Details[] = [];
  search = '';
  resultsLength = 0;
  constructor(public vs: VolunteerService, private changeDetectorRefs: ChangeDetectorRef) {
    this.vs.getVolunteers().subscribe((volunteers: Volunteer[]) => {
      this.volunteers = volunteers;
      this.dataSource = volunteers as unknown as Details[];
      console.log(this.dataSource);
      this.resultsLength = this.dataSource.length;
    });
  }
  ngOnInit(): void {

  }

  delete(v: number) {
    this.vs.removeVolunteer(v);
    this.volunteers = this.volunteers.filter(vo => vo.Id !== v);
  }

  newVolunteer(volunteer) {
    this.volunteers.push(volunteer);
    this.dataSource = this.volunteers as unknown as Details[];
    console.log(this.dataSource);
    this.table.renderRows();
    this.changeDetectorRefs.detectChanges();
  }

  public CalculateAge(element: Details) {
    const birthday = new Date(element.Age);
    const timeDiff = Math.abs(Date.now() - birthday.getTime());
    return Math.floor((timeDiff / (1000 * 3600 * 24)) / 365.25);
}
}


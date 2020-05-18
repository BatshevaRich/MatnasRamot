import { Component, OnInit, ViewChild, ChangeDetectorRef, AfterViewInit } from '@angular/core';
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
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class AllVolunteersComponent implements OnInit, AfterViewInit {
  constructor(public vs: VolunteerService, private changeDetectorRefs: ChangeDetectorRef) {
    this.vs.getVolunteers().subscribe((volunteers: Volunteer[]) => {
      this.volunteers = volunteers;
      this.dataSource.data = volunteers;
      console.log(this.dataSource);
      this.resultsLength = this.dataSource.data.length;
    });
  }
  // dataSource = new MatTableDataSource<Details>();
  @ViewChild(MatTable) table: MatTable<any>;

  displayedColumns = ['Name', 'Address', 'Pelephone', 'Email', 'Age', 'IsActive'];
  expandedElement: Details | null;
  // volunteers: Volunteer[] = [];
  volunteers: any;
  dataSource = new MatTableDataSource();
  search = '';
  resultsLength = 0;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  ngOnInit(): void {

  }
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  delete(v: number) {
    this.vs.removeVolunteer(v);
    this.volunteers = this.volunteers.filter(vo => vo.Id !== v);
  }

  newVolunteer(volunteer) {
    this.volunteers.push(volunteer);
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

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value.trim().toLowerCase();
    this.dataSource.filter = filterValue;
    this.dataSource.data = this.dataSource.filteredData;
  }

}


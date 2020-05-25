import { Component, OnInit, Input, ViewChild, ChangeDetectorRef, AfterViewChecked, AfterViewInit } from '@angular/core';
import { Family } from '../../../Classes/Family';
import { FamilyService } from 'src/app/services/family.service';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource, MatTable } from '@angular/material/table';

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
  displayedColumns = ['LastName', 'Address', 'Telephone', 'NumChildren', 'Status', 'Reference'];
  expandedElement: Details | null;
  families: any;
  dataSource = new MatTableDataSource();
  search = '';
  resultsLength = 0;
  @Input() vId: number;
  inp = false;

  constructor(public fs: FamilyService, private changeDetectorRefs: ChangeDetectorRef) {
    this.dataSource.filterPredicate =
      (data: Details, filter: string) => data.LastName.indexOf(filter) !== -1;
  }
  ngOnInit() {
    if (this.vId) {
      this.inp = true;
      this.fs.getFamiliesByVolunteer(this.vId).subscribe(data => {
        ///TODO: check if empty results, if empty- do not display table
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

  delete(f: number) {
    this.fs.removeFamily(f);
    this.families = this.families.filter(fo => fo.Id !== f);
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }
}

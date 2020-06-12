import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { VolunteerFComponent } from '../../forms/volunteer-f/volunteer-f.component';
import { FamilyFComponent } from '../../forms/family-f/family-f.component';
import { AddVFComponent } from '../../forms/add/add-vf/add-vf.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(public dialog: MatDialog) { }

  ngOnInit(): void {
  }

  VolunteeropenDialog() {
    const dialogRef = this.dialog.open(VolunteerFComponent, {
      data: {
        dataKey: null,
        update: false
      }
    });
    dialogRef.afterClosed().subscribe(res => {
    });
  }
  FamilyopenDialog() {
    const dialogRef = this.dialog.open(FamilyFComponent, {
      data: {
        dataKey: null,
        update: false
      }
    });
    dialogRef.afterClosed().subscribe(result => {
    });
  }
  ToVolunteeropenDialog() {
    const dialogRef = this.dialog.open(AddVFComponent, {
      height: '75%',
      width: '100vh',
      data: {
        dataKey: null,
        update: false
      }
    });
    dialogRef.afterClosed().subscribe(result => {
    });
  }
  GroupopenDialog() {
    const dialogRef = this.dialog.open(FamilyFComponent, {
      data: {
        dataKey: null,
        update: false
      }
    });
    dialogRef.afterClosed().subscribe(result => {
    });
  }

}

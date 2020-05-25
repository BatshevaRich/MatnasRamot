import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { VolunteerFComponent } from './Components/forms/volunteer-f/volunteer-f.component';
import { FamilyFComponent } from './Components/forms/family-f/family-f.component';
import { AllVolunteersComponent } from './Components/all/all-volunteers/all-volunteers.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'endproject';
  constructor(public dialog: MatDialog){

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

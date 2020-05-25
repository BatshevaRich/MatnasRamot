import { Component, OnInit, Input } from '@angular/core';
import { VolunteerAndFamily } from 'src/app/Classes/VolunteerAndFamily';
import { Subscription } from 'rxjs';
import { VolunteerService } from 'src/app/services/volunteer.service';
import { ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { Volunteer } from 'src/app/Classes/Volunteer';
import { VolunteerFComponent } from '../forms/volunteer-f/volunteer-f.component';
import { VolunteerAndFamilyService } from 'src/app/services/volunteer-and-family.service';
import { Category } from 'src/app/Classes/Category';
import { Family } from 'src/app/Classes/Family';

@Component({
  selector: 'app-to-volunteer',
  templateUrl: './to-volunteer.component.html',
  styleUrls: ['./to-volunteer.component.css']
})
export class ToVolunteerComponent implements OnInit {
  toVolunteer: VolunteerAndFamily = new VolunteerAndFamily(
    new Family('fathername',
      'mothername',
      'lastname',
      '0',
      '0',
      '0',
      'address',
      'status',
      2,
      'reason',
      'reference'),
    new Volunteer('default', '000000000', '000000000', 'default@ddd', 'default', '1999-01-01'),
    new Category(), 'default', '1999-01-01'
  );
  id: number;
  @Input() vId: number;
  mySubscription: Subscription;
  constructor(public vs: VolunteerAndFamilyService, public ARS: ActivatedRoute, public dialog: MatDialog) { }

  ngOnDestroy(): void {
    if (this.mySubscription) {
      this.mySubscription.unsubscribe();
    }

  }

  ngOnInit() {
    this.vs.getVolunteering(this.vId).subscribe((v: VolunteerAndFamily) => {
      console.log(v);
      this.toVolunteer = v;
    });
  }

  VolunteeropenDialog() {
    const dialogRef = this.dialog.open(VolunteerFComponent, {
      data: {
        dataKey: this.toVolunteer,
        update: true,
        id: this.toVolunteer.Id
      }
    });
    dialogRef.afterClosed().subscribe(res => {
    });
  }
}

import { Component, OnInit, OnDestroy, Input, Output, EventEmitter } from '@angular/core';
import { Volunteer } from '../../../Classes/Volunteer';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { VolunteerService } from 'src/app/services/volunteer.service';
import { Category } from 'src/app/Classes/Category';
import { MatDialog } from '@angular/material/dialog';
import { VolunteerFComponent } from '../../forms/volunteer-f/volunteer-f.component';
@Component({
  selector: 'app-volunteer',
  templateUrl: './volunteer.component.html',
  styleUrls: ['./volunteer.component.css']
})
export class VolunteerComponent implements OnInit, OnDestroy {
  chooseTab: string;
  myvolunteer: Volunteer;
  categories: Category[] = [];
  id: number;
  @Input() vId: number;
  @Input() toV: boolean;
  @Output() addedVolunteer: EventEmitter<Volunteer> = new EventEmitter<Volunteer>();
  mySubscription: Subscription;
  constructor(public vs: VolunteerService, public ARS: ActivatedRoute, public dialog: MatDialog) {
    this.myvolunteer = new Volunteer('..', '..', '..', '..', '..', '1999', false);
  }

  ngOnDestroy(): void {
    if (this.mySubscription) {
      this.mySubscription.unsubscribe();
    }

  }

  ngOnInit() {
    this.vs.getVolunteer(this.vId).subscribe(v => {
      this.myvolunteer = v;
      this.vs.getCategoriesOfVolunteer(this.vId).subscribe(c => {
        this.categories = c;
      });
    });
  }

  VolunteeropenDialog() {
    const dialogRef = this.dialog.open(VolunteerFComponent, {
      data: {
        dataKey: this.myvolunteer,
        update: true,
        id: this.myvolunteer.Id,
        chosenC: this.categories
      }
    });
    dialogRef.afterClosed().subscribe(res => {
      this.addedVolunteer.emit(res);
    });
  }

}

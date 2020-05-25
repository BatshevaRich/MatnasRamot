import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { Volunteer } from '../../Classes/Volunteer';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { DataServiceService } from '../../Services/data-service.service';
import { VolunteerService } from 'src/app/services/volunteer.service';
import { Category } from 'src/app/Classes/Category';
@Component({
  selector: 'app-volunteer',
  templateUrl: './volunteer.component.html',
  styleUrls: ['./volunteer.component.css']
})
export class VolunteerComponent implements OnInit, OnDestroy {
  chooseTab: string;
  volunteer: Volunteer;
  categories: Category[] = [];
  id: number;
  @Input() vId: number;
  mySubscription: Subscription;
  constructor(public vs: VolunteerService, public ARS: ActivatedRoute) {
    this.volunteer = new Volunteer('..', '..', '..', '..', '..', '1999');
  }

  ngOnDestroy(): void {
    if (this.mySubscription) {
      this.mySubscription.unsubscribe();
    }

  }

  ngOnInit() {
    this.vs.getVolunteer(this.vId).subscribe(v => {
      this.volunteer = v;
      this.vs.getCategoriesOfVolunteer(this.vId).subscribe(c => {
        this.categories = c;
        console.log(c);
      });
    });
  }

}

import { Component, OnInit, OnDestroy } from '@angular/core';
import { Volunteer } from '../../classes/Volunteer';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { DataServiceService } from '../../Services/data-service.service';
import { VolunteerService } from 'src/app/services/volunteer.service';
@Component({
  selector: 'app-volunteer',
  templateUrl: './volunteer.component.html',
  styleUrls: ['./volunteer.component.css']
})
export class VolunteerComponent implements OnInit, OnDestroy {
  volunteer: Volunteer;
  id: number;

  mySubscription: Subscription;
  constructor(public vs: VolunteerService, public ARS: ActivatedRoute) {
   this.mySubscription = ARS.params.subscribe((args) => {
      this.id = args.volunteerId;
      vs.getVolunteer(this.id).subscribe(v => {
        this.volunteer = v;
      });
      this.mySubscription.unsubscribe(); });
  }

  ngOnDestroy(): void {
    this.mySubscription.unsubscribe();
  }

  ngOnInit() {
  }

}

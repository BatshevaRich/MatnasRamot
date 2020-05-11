import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { Volunteer } from '../../Classes/Volunteer';
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
  chooseTab: string;
  volunteer: Volunteer;
  id: number;
  @Input() vId: number;
  mySubscription: Subscription;
  constructor(public vs: VolunteerService, public ARS: ActivatedRoute) {
    this.volunteer = new Volunteer('..', '..', '..', '..', '..', '1999');
  }

  ngOnDestroy(): void {
    this.mySubscription.unsubscribe();

  }

  ngOnInit() {
    this.vs.getVolunteer(this.vId).subscribe(v => {
        this.volunteer = v;
      });
  }

}

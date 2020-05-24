import { Component, OnInit } from '@angular/core';
import { VolunteerAndFamily } from 'src/app/classes/VolunteerAndFamily';
import { Subscription } from 'rxjs';
import { VolunteerAndFamilyService } from 'src/app/services/volunteer-and-family.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-volunteer-family',
  templateUrl: './volunteer-family.component.html',
  styleUrls: ['./volunteer-family.component.css']
})
export class VolunteerFamilyComponent implements OnInit {
  volunteerfamily: VolunteerAndFamily;
  id: number;

  mySubscription: Subscription;
  constructor(public vs: VolunteerAndFamilyService, public ARS: ActivatedRoute) {
   this.mySubscription = ARS.params.subscribe((args) => {
      this.id = args.volunteerId;
      vs.getVolunteering(this.id).subscribe(v => {
        this.volunteerfamily = v;
      });
      if (this.mySubscription) {
      this.mySubscription.unsubscribe();
    } });
  }

  // tslint:disable-next-line: use-lifecycle-interface
  ngOnDestroy(): void {
    if (this.mySubscription) {
      this.mySubscription.unsubscribe();
    }
  }

  ngOnInit() {
  }

}

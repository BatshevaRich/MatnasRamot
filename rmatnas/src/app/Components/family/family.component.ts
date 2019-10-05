import { Component, OnInit, OnDestroy } from '@angular/core';
import { Family } from '../../classes/Family';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { DataServiceService } from '../../Services/data-service.service';
import { FamilyService } from 'src/app/services/family.service';
@Component({
  selector: 'app-family',
  templateUrl: './family.component.html',
  styleUrls: ['./family.component.css']
})
export class FamilyComponent implements OnInit, OnDestroy {
  constructor(public fs: FamilyService, public ARS: ActivatedRoute) {
    /* this.mySubscription = ARS.params.subscribe((args) => {
      this.id = args.volunteerId;
      vs.getVoulanteer(this.id).subscribe(v=>{
        this.volunteer=v;
      });
      //this.mySubscription.unsubscribe();*/

    fs.getFamily(1).subscribe(v => {
      this.family = v;
    });
  }
  family: Family;
  id: number;

  mySubscription: Subscription;
  ngOnDestroy(): void {
    // this.mySubscription.unsubscribe();
  }

  ngOnInit() {}
}

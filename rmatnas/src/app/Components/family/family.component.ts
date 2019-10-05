import { Component, OnInit } from '@angular/core';
import { Family } from '../../classes/Family';
import { DataServiceService } from '../../Services/data-service.service';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { OnDestroy } from '@angular/core';
import { FamilyService } from 'src/app/services/family.service';
import { Category } from 'src/app/Classes/Category';
@Component({
  selector: 'app-family',
  templateUrl: './family.component.html',
  styleUrls: ['./family.component.css']
})
export class FamilyComponent implements OnInit, OnDestroy {
  // tslint:disable-next-line: max-line-length
  family: Family = new Family(1, 'default', 'default', 'hgfds', '87654687465', '6785468654', '687465654', 'default', 'default@dk', 'default', 0, 'default', 'default');
  mySubscription: Subscription;
  Id: number;
  categories:Category[]=[];
  mySubscription2:Subscription;
  constructor(public fs: FamilyService, public ARS: ActivatedRoute) {

    this.mySubscription = ARS.params.subscribe((args) => {
      this.Id = args.familyId;
      fs.getFamily(this.Id).subscribe(d=>{
        this.family = d;
      this.mySubscription2=this.fs.getCategoriesOfFamily(this.family.Id).subscribe(data=>{
      this.categories=data;
    });
      });
    });
  }
  ngOnInit() {
   
  }
  ngOnDestroy(): void {
    this.mySubscription.unsubscribe();
    this.mySubscription2.unsubscribe();
  }
}

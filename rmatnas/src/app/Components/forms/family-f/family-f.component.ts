import { Component, OnInit } from '@angular/core';
import { Family } from 'src/app/classes/Family';
import { DataServiceService } from '../../../Services/data-service.service';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-family-f',
  templateUrl: './family-f.component.html',
  styleUrls: ['./family-f.component.css']
})
export class FamilyFComponent implements OnInit {
  // tslint:disable-next-line: max-line-length
  newFamily: Family = new Family(
    1,
    'ברירת מחדל',
    'ברירת מחדל',
    'ברירת מחדל',
    '0',
    '0',
    '0',
    'ברירת מחדל',
    'aaa@a',
    'ברירת מחדל',
    2,
    'לל',
    'לל'
  );
  mySubscription: Subscription;
  id: number;
  constructor(public ds: DataServiceService, public ARS: ActivatedRoute) {
   /* this.mySubscription = ARS.params.subscribe(args => {
      this.id = args.familyId;*/
     /* if (this.id !== 0) {*/
       // this.newFamily = ds.getFamily(this.id);
    /*  }
      this.mySubscription.unsubscribe();*/
  //  });
  }
  ngOnInit() {}
  submitForm(f) {
    // tslint:disable-next-line: max-line-length
  /*  if (this.id !== 0) {
      this.ds.addFamily(this.newFamily);
    } else {*/
      this.ds.addFamily(this.newFamily);
   
    //  f.reset();
  }
}

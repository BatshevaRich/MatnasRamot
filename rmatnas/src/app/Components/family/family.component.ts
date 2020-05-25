import { Component, OnInit, Input } from '@angular/core';
import { Family } from '../../Classes/Family';
import { DataServiceService } from '../../Services/data-service.service';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { OnDestroy } from '@angular/core';
import { FamilyService } from 'src/app/services/family.service';
import { Category } from 'src/app/Classes/Category';
import { FamilyFComponent } from '../forms/family-f/family-f.component';
import { MatDialog } from '@angular/material/dialog';
@Component({
  selector: 'app-family',
  templateUrl: './family.component.html',
  styleUrls: ['./family.component.css']
})
export class FamilyComponent implements OnInit, OnDestroy {
  family: Family = new Family('fathername',
  'mothername',
  'lastname',
  '0',
  '0',
  '0',
  'address',
  'status',
  2,
  'reason',
  'reference');
  mySubscription: Subscription;
  id: number;
  categories: Category[] = [];
  mySubscription2: Subscription;
  @Input() vId: number;
  chooseTab: string;
  constructor(public fs: FamilyService, public ARS: ActivatedRoute, public dialog: MatDialog) {

    // this.mySubscription = ARS.params.subscribe((args) => {
    //   this.id = args.familyId;
    //   fs.getFamily(this.id).subscribe(d => {
    //     this.family = d;
    //     this.mySubscription2 = this.fs.getCategoriesOfFamily(this.family.Id).subscribe(data => {
    //   this.categories = data;
    // });
    //   });
    // });
  }
  ngOnInit() {
    this.fs.getFamily(this.vId).subscribe(f => {
      this.family = f;
      // this.fs.getCategoriesOfFamily(this.fId).subscribe(c => {
      //   this.categories = c;
      //   console.log(c);
      // });
    });
  }
  ngOnDestroy(): void {
    if (this.mySubscription) {
      this.mySubscription.unsubscribe();
    }
    // this.mySubscription2.unsubscribe();
  }

  FamilyopenDialog() {
    const dialogRef = this.dialog.open(FamilyFComponent, {
      data: {
        dataKey: this.family,
        update: true,
        id: this.family.Id
      }
    });
    dialogRef.afterClosed().subscribe(res => {
    });
  }
}

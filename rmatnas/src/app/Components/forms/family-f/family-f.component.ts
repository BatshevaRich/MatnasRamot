import { Component, OnInit } from '@angular/core';
import { Family } from 'src/app/Classes/Family';
import { DataServiceService } from '../../../Services/data-service.service';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { FamilyService } from 'src/app/services/family.service';
import { Category } from '../../../Classes/Category';
import { CategoryService } from 'src/app/services/category.service';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-family-f',
  templateUrl: './family-f.component.html',
  styleUrls: ['./family-f.component.css']
})
export class FamilyFComponent implements OnInit {
  // tslint:disable-next-line: max-line-length
  newFamily: Family = new Family(
    
    'fathername',
    'mothername',
    'lastname',
    '0',
    '0',
    '0',
    'address',
    'status',
    2,
    'reason',
    'reference'
  );
  id: number;
  categories: Category[] = [];
  constructor(public fs: FamilyService, private cs: CategoryService, private dialogRef: MatDialogRef<FamilyFComponent>) {
  }
  ngOnInit() {}
  submitForm(f) {
      const fa = new Family(this.newFamily.Id, this.newFamily.FirstNameFather
        , this.newFamily.FirstNameMother, this.newFamily.LastName, this.newFamily.Telephone, this.newFamily.PelephoneFather, this.newFamily.PelephoneMother,
        this.newFamily.Address, this.newFamily.Email, this.newFamily.Status, this.newFamily.NumChildren, this.newFamily.Reason, this.newFamily.Reference);
      this.fs.addFamily(fa);
      this.cs.AddCategoriesForFamily(fa, this.categories);
      this.dialogRef.close();
      f.reset();
  }
  selectCategories(e) {
    this.categoriesSelected = [];
    e.forEach(element => {
      this.add(element)
    });
  }

  ngOnDestroy() {
    if (this.mySubscription) {
      this.mySubscription.unsubscribe();
    }
  }
}

import { Component, OnInit, Inject, ViewChild, OnDestroy } from '@angular/core';
import { Family } from 'src/app/Classes/Family';
import { DataServiceService } from '../../../Services/data-service.service';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { FamilyService } from 'src/app/services/family.service';
import { Category } from '../../../Classes/Category';
import { CategoryService } from 'src/app/services/category.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-family-f',
  templateUrl: './family-f.component.html',
  styleUrls: ['./family-f.component.css']
})
export class FamilyFComponent implements OnInit, OnDestroy {
  // tslint:disable-next-line: max-line-length
  categories: Category[] = [];
  mySubscription: Subscription;
  categoriesSelected: Category[] = [];
  @ViewChild('familyForm') mytemplateForm: NgForm;
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
  constructor(public fs: FamilyService,
              private cs: CategoryService,
              private dialogRef: MatDialogRef<FamilyFComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any) {
    this.mySubscription = cs.getCategories().subscribe(res => {
      this.categories = res;
      console.log(res);
    });
  }
  ngOnInit() {
    if (this.data.update) {
      this.newFamily = this.data.dataKey;
    }
    console.log(this.data);
  }
  submitForm(f) {
    if (this.data.update) {
      this.newFamily.Id = this.data.id;
      this.fs.updateFamily(this.newFamily);
    } else {
      this.fs.addFamily(this.newFamily, this.categoriesSelected)
        .then(t => {
          /////////////////////// need to find out about safe casting in ts
          this.newFamily.Id = t as number;
          this.categoriesSelected = [];
          // this.addedVolunteer.emit(this.newVolunteer);
          this.dialogRef.close(t);
        });
      this.mytemplateForm.resetForm();
      this.newFamily = new Family('fathername',
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
    }

  }

  add(c: Category) {
    if (!this.categoriesSelected.includes(c)) {
      //   this.categoriesSelected = this.categoriesSelected.filter(co => co.Id !== c.Id);
      // } else {
      this.categoriesSelected.push(c);
    }
  }

  selectCategories(e) {
    this.categoriesSelected = [];
    e.forEach(element => {
      this.add(element);
    });
  }

  ngOnDestroy() {
    if (this.mySubscription) {
      this.mySubscription.unsubscribe();
    }
  }
}

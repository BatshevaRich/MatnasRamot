import { Component, OnInit, Inject, ViewChild, OnDestroy, ElementRef } from '@angular/core';
import { Family } from 'src/app/Classes/Family';
import { Subscription } from 'rxjs';
import { FamilyService } from 'src/app/services/family.service';
import { Category } from '../../../Classes/Category';
import { CategoryService } from 'src/app/services/category.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NgForm } from '@angular/forms';
import { MatSnackBar } from '@angular/material';

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
  categoriesOfFamily: Category[] = [];
  newFamily: Family = new Family(
    'fathername', 'mothername', 'lastname',
    '0', '0', '0', 'address', 'status', 2, 'reason', 'reference');
  id: number;
  constructor(public fs: FamilyService,
              private cs: CategoryService,
              private dialogRef: MatDialogRef<FamilyFComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              private snackBar: MatSnackBar,
              private elementRef: ElementRef) {
    this.mySubscription = cs.getCategories().subscribe(res => {
      this.categories = res;
    });
  }
  ngOnInit() {

    if (this.data.update) {
      this.newFamily = this.data.dataKey;
      this.categoriesOfFamily = this.data.chosenC;
    }
  }
  submitForm(f) {
    if (this.data.update) {
      this.newFamily.Id = this.data.id;
      this.fs.updateFamily(this.newFamily, this.categoriesSelected);
      this.dialogRef.close(this.newFamily);
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
    this.snackBar.open('שמירת משפחה מבוצעת...', 'OK', {
      duration: 2000,
      direction: 'rtl'
    });

  }

  selectCategories(e) {
    this.categoriesSelected = [];
    e.forEach(element => {
      if (element.checked) {
        this.categoriesSelected.push(new Category(element.name, element.id));
      }
    });
  }

  ngOnDestroy(): void {
    this.elementRef.nativeElement.remove();
  }
}

import { Component, OnInit, Inject, ViewChild, OnDestroy, ElementRef } from '@angular/core';
import { Family } from '../../../Classes/Family';
import { FamilyService } from '../../../services/family.service';
import { Category } from '../../../Classes/Category';
import { CategoryService } from '../../../services/category.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NgForm, FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-family-f',
  templateUrl: './family-f.component.html',
  styleUrls: ['./family-f.component.css']
})
export class FamilyFComponent implements OnInit, OnDestroy {
  categories: Category[] = [];
  categoriesSelected: Category[] = [];
  @ViewChild('familyForm') mytemplateForm: NgForm;
  categoriesOfFamily: Category[] = [];
  newFamily: Family = new Family(
    '', '', '', '', '', '', '', '', 1, '', '');
  id: number;
  myForm: FormGroup;
  constructor(public fs: FamilyService,
              private cs: CategoryService,
              private dialogRef: MatDialogRef<FamilyFComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              private snackBar: MatSnackBar,
              private elementRef: ElementRef,
              private formBuilder: FormBuilder) {
    this.myForm = this.formBuilder.group({
      firstnameF: new FormControl('', [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(20)
      ]),
      firstnameM: new FormControl('', [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(20)
      ]),
      lastname: new FormControl('', [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(20)
      ]),
      email: new FormControl('', [
        Validators.minLength(5),
        Validators.maxLength(25),
        Validators.pattern('^[^\\s@]+@[^\\s@]+\\.[^\\s@]{2,}$')
      ]),
      phone: new FormControl('', [
        Validators.minLength(9),
        Validators.maxLength(9),
        Validators.pattern('^[0-9]*$')
      ]),
      cellphoneF: new FormControl('', [
        Validators.required,
        Validators.minLength(10),
        Validators.maxLength(10)
      ]),
      cellphoneM: new FormControl('', [
        Validators.required,
        Validators.minLength(10),
        Validators.maxLength(10)
      ]),
      numchildren: new FormControl('', [
        Validators.required,
        Validators.min(0),
        Validators.max(20)
      ])
    });
    cs.getCategories().subscribe((res: Category[]) => {
      this.categories = res;
    });
  }
  ngOnInit() {
    if (this.data.update) {
      this.newFamily = this.fs.trimResultFromUpdate(this.data.dataKey);
      this.myForm.get('lastname').setValue(this.newFamily.LastName);
      this.myForm.get('firstnameF').setValue(this.newFamily.FirstNameFather);
      this.myForm.get('firstnameM').setValue(this.newFamily.FirstNameMother);
      this.myForm.get('phone').setValue(this.newFamily.Telephone);
      this.myForm.get('cellphoneF').setValue(this.newFamily.PelephoneFather);
      this.myForm.get('cellphoneM').setValue(this.newFamily.PelephoneMother);
      this.myForm.get('numchildren').setValue(this.newFamily.NumChildren);
      this.categoriesOfFamily = this.data.chosenC;
    }
  }

  submitForm() {
    if (this.data.update) {
      this.newFamily.Id = this.data.id;
      this.fs.updateFamily(this.newFamily, this.categoriesSelected);
      this.dialogRef.close(this.newFamily);
    } else {
      this.fs.addFamily(this.newFamily, this.categoriesSelected)
        .then((t: number) => {
          this.newFamily.Id = t;
          this.categoriesSelected = [];
          this.dialogRef.close(t);
        });
      this.mytemplateForm.resetForm();
      this.newFamily = new Family('fathername', 'mothername', 'lastname', '0',
        '0', '0', 'address', 'status', 2, 'reason', 'reference');
    }
    this.snackBar.open('שמירת משפחה מבוצעת...', 'OK', {
      duration: 2000,
      direction: 'rtl'
    });

  }

  selectCategories(e: { checked: boolean, id: number, name: string }[]) {
    this.categoriesSelected = [];
    e.forEach((element: { checked: boolean, id: number, name: string }) => {
      if (element.checked) {
        this.categoriesSelected.push(new Category(element.name, element.id));
      }
    });
  }

  ngOnDestroy(): void {
    this.elementRef.nativeElement.remove();
  }
}

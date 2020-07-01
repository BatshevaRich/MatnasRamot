import { Component, OnInit, ViewChild, Inject, OnDestroy, ElementRef } from '@angular/core';
import { Organization } from '../../../Classes/Organization';
import { NgForm, FormControl, Validators, FormGroup, FormBuilder } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { OrganizationService } from '../../../services/organization.service';
import { Category } from '../../../Classes/Category';
import { CategoryService } from '../../../services/category.service';

@Component({
  selector: 'app-organization-f',
  templateUrl: './organization-f.component.html',
  styleUrls: ['./organization-f.component.css']
})
export class OrganizationFComponent implements OnInit, OnDestroy {
  @ViewChild('organizationForm') mytemplateForm: NgForm;
  categories: Category[] = [];
  categoriesOfOrganization: Category[] = [];
  email = new FormControl('', [Validators.required, Validators.email]);
  newOrganization: Organization = new Organization('', '', '', '', '', '');
  token = 0;
  categoriesSelected: Category[] = [];
  myForm: FormGroup;
  constructor(public os: OrganizationService,
              private cs: CategoryService,
              private dialogRef: MatDialogRef<OrganizationFComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              public snackBar: MatSnackBar,
              private elementRef: ElementRef,
              private formBuilder: FormBuilder) {
    this.myForm = this.formBuilder.group({
      name: new FormControl('', [
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(20)
      ]),
      email: new FormControl('', [
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(25),
        Validators.pattern('^[^\\s@]+@[^\\s@]+\\.[^\\s@]{2,}$')
      ]),
      phone: new FormControl('', [
        Validators.minLength(9),
        Validators.maxLength(10),
        Validators.pattern('^[0-9]*$')
      ]),
      cellphone: new FormControl('', [
        Validators.required,
        Validators.minLength(10),
        Validators.maxLength(10)
      ])
    });
    cs.getCategories().subscribe((res: Category[]) => {
      this.categories = res;
    });
  }

  ngOnInit() {
    if (this.data.update) {
      this.newOrganization = this.os.trimResultFromUpdate(this.data.dataKey);
      this.myForm.get('name').setValue(this.newOrganization.Name);
      this.myForm.get('email').setValue(this.newOrganization.email);
      this.myForm.get('phone').setValue(this.newOrganization.Phone);
      this.categoriesOfOrganization = this.data.chosenC;
    }
  }

  ngOnDestroy(): void {
    this.elementRef.nativeElement.remove();
  }

  selectCategories(e: { checked: boolean, id: number, name: string }[]) {
    this.categoriesSelected = [];
    e.forEach((element: { checked: boolean, id: number, name: string }) => {
      if (element.checked) {
        this.categoriesSelected.push(new Category(element.name, element.id));
      }
    });
  }

  submitForm() {
    if (this.data.update) {
      this.newOrganization.Id = this.data.id;
      this.os.updateOrganization(this.newOrganization, this.categoriesSelected);
      this.dialogRef.close(this.newOrganization);
    } else {
      this.os.addOrganization(this.newOrganization, this.categoriesSelected)
        .then((t: number) => {
          this.token = t;
          this.newOrganization.Id = this.token;
          this.categoriesSelected = [];
          this.dialogRef.close(this.token);
        });
      this.mytemplateForm.resetForm();
      this.newOrganization = new Organization('', null, '', null, null, '');
      this.snackBar.open('שמירת ארגון מבוצעת...', 'OK', {
        duration: 2000,
        direction: 'rtl'
      });
    }
  }

  getErrorMessage() {
    if (this.email.hasError('required')) {
      return 'הערך שהוזן אינו תקני';
    }
  }
}

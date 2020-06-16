import { Component, OnInit, ViewChild, Inject, OnDestroy, ElementRef } from '@angular/core';
import { Organization } from 'src/app/Classes/Organization';
import { NgForm, FormControl, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef, MatSnackBar } from '@angular/material';
import { OrganizationService } from 'src/app/services/organization.service';
import { Category } from 'src/app/Classes/Category';
import { CategoryService } from 'src/app/services/category.service';

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
  newOrganization: Organization = new Organization('ברירת מחדל', 'ברירת מחדל', '11', 'ברירת מחדל', 'ברירת מחדל', '1@1');
  token = 0;
  categoriesSelected: Category[] = [];
  constructor(public os: OrganizationService,
              private cs: CategoryService,
              private dialogRef: MatDialogRef<OrganizationFComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              public snackBar: MatSnackBar,
              private elementRef: ElementRef) {
                cs.getCategories().subscribe((res: Category[]) => {
                  this.categories = res;
                });
               }

  ngOnInit() {
    if (this.data.update) {
      this.newOrganization = this.data.dataKey;
      this.categoriesOfOrganization = this.data.chosenC;
    }
  }

  trimResultsFromDB(organizations: Organization[]) {
    for (const organization of organizations) {
      organization.Name = organization.Name.trim();
      organization.email = organization.email.trim();
      organization.Address == null ? organization.Address = '' : organization.Address = organization.Address.trim();
      organization.Phone == null ? organization.Phone = '' : organization.Phone = organization.Phone.trim();
      organization.Comments == null ? organization.Comments = '' : organization.Comments = organization.Comments.trim();
      organization.Contact == null ? organization.Contact = '' : organization.Contact = organization.Contact.trim();
    }
    return organizations;
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
      this.newOrganization = new Organization('default', null, '000000000', null, null, 'default@ddd');
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

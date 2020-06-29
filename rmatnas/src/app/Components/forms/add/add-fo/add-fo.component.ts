import { Component, OnInit, Input, Inject, ElementRef, OnDestroy } from '@angular/core';
import { Family } from 'src/app/Classes/Family';
import { Organization } from 'src/app/Classes/Organization';
import { Category } from 'src/app/Classes/Category';
import { FamilyService } from 'src/app/services/family.service';
import { OrganizationService } from 'src/app/services/organization.service';
import { CategoryService } from 'src/app/services/category.service';
import { OrganizationAndFamilyService } from 'src/app/services/organization-and-family.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { OrganizationAndFamily } from 'src/app/Classes/OrganizationAndFamily';

@Component({
  selector: 'app-add-fo',
  templateUrl: './add-fo.component.html',
  styleUrls: ['./add-fo.component.css']
})
export class AddFOComponent implements OnInit, OnDestroy {

  @Input() idOrganization: number;
  families: Family[] = [];
  selectedFamilies: Family[] = [];
  categories: Category[] = [];
  selectedOrganization: Organization = null;
  selectedCategories: Category[] = [];
  constructor(private fs: FamilyService,
              private os: OrganizationService,
              private cs: CategoryService,
              private oaf: OrganizationAndFamilyService,
              private dialogRef: MatDialogRef<AddFOComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              private snackBar: MatSnackBar,
              private elementRef: ElementRef) {
  }

  ngOnInit() {
    this.idOrganization = this.data.id;
    this.os.getOrganization(this.idOrganization).subscribe((res: Organization) => {
      this.selectedOrganization = res;
    });
    this.os.getCategoriesOfOrganization(this.idOrganization).subscribe((cats: Category[]) => {
      this.selectedCategories = cats;
      this.selectedCategories.forEach(element => {
        this.fs.getFamiliesByCategory(element.Id).subscribe((data: Family[]) => {
          data.forEach(family => {
            this.families.push(family);
          });
        });
      });
    });
   }

  ngOnDestroy(): void {
    this.elementRef.nativeElement.remove();
  }

  onSelection(event) {
  }


  submitForm() {
    this.selectedFamilies.forEach((element: Family) => {
      this.oaf.addFamilyToOrganization(
        new OrganizationAndFamily(element, this.selectedOrganization, this.selectedCategories[0], '', ''));
    });

    // this.vaf.addOrganizationAction(this.selectedOrganization, this.selectedFamily, this.selectedCategory);
    // this.snackBar.open('שמירת התנדבות מבוצעת...', 'OK', {
    //     duration: 2000,
    //     direction: 'rtl'
    //   });
  }
}

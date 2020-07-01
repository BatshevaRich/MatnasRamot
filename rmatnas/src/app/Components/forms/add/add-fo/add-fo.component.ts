import { Component, OnInit, Input, Inject, ElementRef, OnDestroy } from '@angular/core';
import { Family } from '../../../../Classes/Family';
import { Organization } from '../../../../Classes/Organization';
import { Category } from '../../../../Classes/Category';
import { FamilyService } from '../../../../services/family.service';
import { OrganizationService } from '../../../../services/organization.service';
import { CategoryService } from '../../../../services/category.service';
import { OrganizationAndFamilyService } from '../../../../services/organization-and-family.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { OrganizationAndFamily } from '../../../../Classes/OrganizationAndFamily';

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

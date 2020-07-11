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
  objectCategories: Category[] = [];
  comments: string;
  selectedCategory: Category;
  constructor(private fs: FamilyService,
              private os: OrganizationService,
              private cs: CategoryService,
              private oaf: OrganizationAndFamilyService,
              private dialogRef: MatDialogRef<AddFOComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              private snackBar: MatSnackBar,
              private elementRef: ElementRef) {
      this.refresh();
  }

  refresh() {
    this.selectedCategory = null;
    this.selectedOrganization = this.data.organization;
    if (this.selectedOrganization) {
      this.os.getCategoriesOfOrganization(this.selectedOrganization.Id).subscribe((res: Category[]) => {
        this.objectCategories = res;
      });
      this.fs.getFamilies().subscribe((res: Family[]) => {
        this.families = res;
      });
    }
  }

  ngOnInit() {  }

  ngOnDestroy(): void {
    this.elementRef.nativeElement.remove();
  }

  onSelection(event) {
  }

  onSelectionC(event: Category) {
    if (event) {
      this.selectedCategory = event;
      if (this.selectedOrganization) {
        this.fs.getFamiliesByOrganization(event.Id).subscribe((res: Family[]) => {
          this.families = res;
        });
      }
    } else {
      this.selectedCategory = null;
      this.fs.getFamilies().subscribe((res: Family[]) => {
          this.families = res;
      });
    }
  }


  submitForm() {
    this.selectedFamilies.forEach((element: Family) => {
      this.oaf.addFamilyToOrganization(
        new OrganizationAndFamily(element, this.selectedOrganization, this.selectedCategory, '', ''));
    });

    // this.vaf.addOrganizationAction(this.selectedOrganization, this.selectedFamily, this.selectedCategory);
    // this.snackBar.open('שמירת התנדבות מבוצעת...', 'OK', {
    //     duration: 2000,
    //     direction: 'rtl'
    //   });
  }
}

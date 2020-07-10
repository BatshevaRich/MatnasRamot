import { Component, OnInit, Input, Inject, OnDestroy, ElementRef } from '@angular/core';
import { Family } from '../../../../Classes/Family';
import { Volunteer } from '../../../../Classes/Volunteer';
import { Category } from '../../../../Classes/Category';
import { CategoryService } from '../../../../services/category.service';
import { FamilyService } from '../../../../services/family.service';
import { VolunteerService } from '../../../../services/volunteer.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { VolunteerAndFamilyService } from '../../../../services/volunteer-and-family.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { MatOption } from '@angular/material/core';

@Component({
  selector: 'app-add-vf',
  templateUrl: './add-vf.component.html',
  styleUrls: ['./add-vf.component.css']
})
export class AddVFComponent implements OnInit, OnDestroy {
  @Input() idFamily: number;
  @Input() idVolunteer: number;
  families: Family[] = [];
  volunteers: Volunteer[] = [];
  categories: Category[] = [];
  objectCategories: Category[] = [];
  comments: string;
  dateAdded: Date;
  selectedFamily: Family = null;
  selectedVolunteer: Volunteer = null;
  selectedCategory: Category;
  selectedCategories: Category[] = [];
  selectedVolunteers: Volunteer[] = [];
  selectedFamilies: Family[] = [];
  constructor(private fs: FamilyService,
              private vs: VolunteerService,
              private cs: CategoryService,
              private vaf: VolunteerAndFamilyService,
              private dialogRef: MatDialogRef<AddVFComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              private snackBar: MatSnackBar,
              private elementRef: ElementRef) {
    this.refresh();
  }
  refresh() {
    this.selectedCategory = null;
    this.selectedFamily = this.data.family;
    this.selectedVolunteer = this.data.volunteer;
    if (this.selectedFamily) {
      this.fs.getCategoriesOfFamily(this.selectedFamily.Id).subscribe((res: Category[]) => {
        this.objectCategories = res;
      });
      this.vs.getVolunteers().subscribe((res: Volunteer[]) => {
        this.volunteers = res;
        this.volunteers = this.volunteers.filter((v: Volunteer) => v.IsActive);
      });
    }
    if (this.selectedVolunteer) {
      this.vs.getCategoriesOfVolunteer(this.selectedVolunteer.Id).subscribe((res: Category[]) => {
        this.objectCategories = res;
      });
      this.fs.getFamilies().subscribe((res: Family[]) => {
        this.families = res;
      });
    }
  }

  ngOnInit() { }

  ngOnDestroy(): void {
    this.elementRef.nativeElement.remove();
  }

  onSelection(event) {
  }

  onSelectionC(event: Category) {
    if (event) {
      this.selectedCategory = event;
      if (this.selectedFamily) {
        this.vs.getVolunteersByCategory(event.Id).subscribe((res: Volunteer[]) => {
          this.volunteers = res;
        });
      } else if (this.selectedVolunteer) {
        this.fs.getFamiliesByCategory(event.Id).subscribe((res: Family[]) => {
          this.families = res;
        });
      }
    } else {
      this.selectedCategory = null;
      if (this.selectedFamily) {
        this.vs.getVolunteers().subscribe((res: Volunteer[]) => {
          this.volunteers = res;
        });
      } else if (this.selectedVolunteer) {
        this.fs.getFamilies().subscribe((res: Family[]) => {
          this.families = res;
        });
      }
    }
  }


  submitFormF() {
    this.selectedVolunteers.forEach((element: Volunteer) => {
      this.vaf.addVolunteerAction(element, this.selectedFamily, this.selectedCategory);
      this.snackBar.open('שמירת התנדבות מבוצעת...', 'OK', {
        duration: 2000,
            direction: 'rtl'
          });
    });
    this.dialogRef.close(this.selectedFamily.Id);

  }

  submitFormV() {
    this.selectedFamilies.forEach((element: Family) => {
      this.vaf.addVolunteerAction(this.selectedVolunteer, element, this.selectedCategory);
      this.snackBar.open('שמירת התנדבות מבוצעת...', 'OK', {
        duration: 2000,
        direction: 'rtl'
      });
    });
  }

}

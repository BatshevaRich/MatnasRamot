import { Component, OnInit, Input, Inject } from '@angular/core';
import { Family } from 'src/app/Classes/Family';
import { Volunteer } from 'src/app/Classes/Volunteer';
import { Category } from 'src/app/Classes/Category';
import { CategoryService } from 'src/app/services/category.service';
import { FamilyService } from 'src/app/services/family.service';
import { VolunteerService } from 'src/app/services/volunteer.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { VolunteerAndFamilyService } from 'src/app/services/volunteer-and-family.service';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-add-vf',
  templateUrl: './add-vf.component.html',
  styleUrls: ['./add-vf.component.css']
})
export class AddVFComponent implements OnInit {
  @Input() idFamily: number;
  @Input() idVolunteer: number;
  families: Family[] = [];
  volunteers: Volunteer[] = [];
  categories: Category[] = [];
  comments: string;
  dateAdded: Date;
  selectedFamily: Family = null;
  selectedVolunteer: Volunteer = null;
  selectedCategory: Category;
  constructor(private fs: FamilyService,
              private vs: VolunteerService,
              private cs: CategoryService,
              private vaf: VolunteerAndFamilyService,
              private dialogRef: MatDialogRef<AddVFComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              private snackBar: MatSnackBar) {
    this.refresh();
  }
  refresh() {
    this.selectedCategory = null;
    this.selectedFamily = null;
    this.selectedVolunteer = null;
    this.vs.getVolunteers().subscribe(res => {
      this.volunteers = res;
      this.volunteers = this.volunteers.filter(v => v.IsActive);
    });
    this.fs.getFamilies().subscribe(res => {
      this.families = res;
    });
    this.cs.getCategories().subscribe(res => {
      this.categories = res;
    });
  }

  ngOnInit() { }

  onChangeFamily(newValue, tab) {
    if (tab === 3) {
      this.selectedCategory = null;
      this.selectedVolunteer = null;
      this.selectedFamily != null ? this.fs.getCategoriesOfFamily(this.selectedFamily.Id)
        .subscribe(res => {
          this.categories = res;
        }) : this.selectedFamily = null;
    }
  }

  volunteerChanged($event, tab) {
    if (tab === 1) {
      this.selectedFamily = null;
      this.selectedVolunteer != null ? this.fs.getFamiliesByCategory(this.selectedCategory.Id)
        .subscribe(res => {
          this.families = res;
        }) : this.selectedVolunteer = null;
    }
    if (tab === 2) {
      this.selectedFamily = null;
      this.selectedCategory = null;
      this.selectedVolunteer != null ? this.vs.getCategoriesOfVolunteer(this.selectedVolunteer.Id)
        .subscribe(res => {
          this.categories = res;
        }) : this.selectedVolunteer = null;
    }
    if (tab === 3) {

    }
  }
  onChangeCtegory($event, tab) {
    if (tab === 1) {
      this.selectedVolunteer = null;
      this.selectedFamily = null;
      this.selectedCategory != null ? this.vs.getVolunteersByCategory(this.selectedCategory.Id)
        .subscribe(res => {
          this.volunteers = res;
          this.volunteers = this.volunteers.filter(v => v.IsActive);
        }) : this.selectedCategory = null;
    }
    if (tab === 2) {
      this.selectedFamily = null;
      this.selectedCategory != null ? this.fs.getFamiliesByCategoryAndVolunteer(this.selectedCategory.Id, this.selectedVolunteer.Id)
        .subscribe(res => {
          this.families = res;
        }) : this.selectedCategory = null;
    }
    if (tab === 3) {
      this.selectedVolunteer = null;
      this.selectedCategory != null ? this.vs.getVolunteersByCategory(this.selectedCategory.Id)
      .subscribe(res => {
        this.volunteers = res;
        this.volunteers = this.volunteers.filter(v => v.IsActive);
      }) : this.selectedCategory = null;
    }
  }
  submitForm(f) {
    this.vaf.addVolunteerAction(this.selectedVolunteer, this.selectedFamily, this.selectedCategory);
    this.snackBar.open('שמירת התנדבות מבוצעת...', 'OK', {
        duration: 2000,
        direction: 'rtl'
      });
  }
}

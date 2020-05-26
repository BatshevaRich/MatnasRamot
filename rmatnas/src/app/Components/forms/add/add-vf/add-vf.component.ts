import { Component, OnInit, Input, Inject } from '@angular/core';
import { Family } from 'src/app/Classes/Family';
import { Volunteer } from 'src/app/Classes/Volunteer';
import { Category } from 'src/app/Classes/Category';
import { CategoryService } from 'src/app/services/category.service';
import { FamilyService } from 'src/app/services/family.service';
import { VolunteerService } from 'src/app/services/volunteer.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

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
  // @Input()
  categories: Category[] = [];
  comments: string;
  dateAdded: Date;
  selectedFamily: Family;
  selectedVolunteer: Volunteer;
  selectedCategory: Category;
  constructor(private fs: FamilyService, private vs: VolunteerService, private dialogRef: MatDialogRef<AddVFComponent>, @Inject(MAT_DIALOG_DATA) public data: any) {
    this.vs.getVolunteers().subscribe(res=>{
      this.volunteers = res;console.log(this.volunteers);
    })
    this.fs.getFamilies().subscribe(res=>{
      this.families = res;console.log(this.families);
    });
    
  }
  ngOnInit() {
    this.categories.push(new Category());
    this.families.push(new Family('fathername',
    'mothername',
    'lastname',
    '0',
    '0',
    '0',
    'address',
    'status',
    2,
    'reason',
    'reference'));
    // this.volunteers.push(new Volunteer());
  }
  onChangeFamily(newValue) {
    console.log(newValue);
    this.idVolunteer = this.selectedVolunteer.Id;
  }
  onChangeVolunteer(newValue) {
    console.log(newValue);
    this.idFamily = this.selectedFamily.Id;
  }
  onChangeCtegory($event) {
    if (this.idFamily) {
      this.vs.getVolunteersByCategoryAndFamily(this.idFamily, this.selectedCategory).subscribe(data =>
        this.volunteers = data);
    } else {
      // this.fs.getFamiliesByCategoryAndVolunteer().subscribe(data =>
      //   this.families = data);
    }
  }
}

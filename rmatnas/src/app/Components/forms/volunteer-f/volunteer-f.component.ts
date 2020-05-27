import { Component, OnInit, EventEmitter, Output, ViewChild, Inject } from '@angular/core';
import { Volunteer } from '../../../Classes/Volunteer';
import { DataServiceService } from '../../../Services/data-service.service';
import { VolunteerService } from 'src/app/services/volunteer.service';
import { Form, NgForm } from '@angular/forms';
import { Category } from 'src/app/Classes/Category';
import { Subscription } from 'rxjs';
import { CategoryService } from 'src/app/services/category.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
@Component({
  selector: 'app-volunteer-f',
  templateUrl: './volunteer-f.component.html',
  styleUrls: ['./volunteer-f.component.css']
})
export class VolunteerFComponent implements OnInit {
  categories: Category[] = [];
  categoriesOfVolunteer: Category[] = [];
  mySubscription: Subscription;
  // @Output() selectc: EventEmitter<Category[]> = new EventEmitter<Category[]>();
  categoriesSelected: Category[] = [];
  @Output() addedVolunteer: EventEmitter<Volunteer> = new EventEmitter<Volunteer>();
  newVolunteer: Volunteer = new Volunteer('default', '000000000', '000000000', 'default@ddd', 'default', '1999-01-01', false);
  constructor(public vs: VolunteerService, private cs: CategoryService, private dialogRef: MatDialogRef<VolunteerFComponent>, @Inject(MAT_DIALOG_DATA) public data: any) {
    this.mySubscription = cs.getCategories().subscribe(data => {
      this.categories = data;
      console.log(data);
    });
  }



  @ViewChild('volunteerForm') mytemplateForm: NgForm;

  token = 0;

  ngOnInit() {
    if (this.data.update) {
      this.newVolunteer = this.data.dataKey;
      this.vs.getCategoriesOfVolunteer(this.newVolunteer.Id).subscribe(res =>{
        this.categoriesOfVolunteer =  this.categoriesOfVolunteer.concat(res as Category[]);
      });
    }
    console.log(this.data);
  }
  submitForm(f) {
    if (this.data.update) {
      this.newVolunteer.Id = this.data.id;
      this.vs.updateVolunteer(this.newVolunteer);
    } else {
      this.vs.addVolunteer(this.newVolunteer, this.categoriesSelected)
        .then(t => {
          this.token = t as number;
          /////////////////////// need to find out about safe casting in ts
          this.newVolunteer.Id = this.token;
          this.categoriesSelected = [];
          // this.addedVolunteer.emit(this.newVolunteer);
          this.dialogRef.close(this.token);
        });
      this.mytemplateForm.resetForm();
      this.newVolunteer = new Volunteer('default', '000000000', '000000000', 'default@ddd', 'default', '1999-01-01', false);
    }
  }

  ngOnDestroy() {
    if (this.mySubscription) {
      this.mySubscription.unsubscribe();
    }
  }
  add(c: Category) {
    if (!this.categoriesSelected.includes(c)) {
      //   this.categoriesSelected = this.categoriesSelected.filter(co => co.Id !== c.Id);
      // } else {
      this.categoriesSelected.push(c);
    }
  }

  selectCategories(e) {
    this.categoriesSelected = [];
    e.forEach(element => {
      this.add(element);
    });
  }
}

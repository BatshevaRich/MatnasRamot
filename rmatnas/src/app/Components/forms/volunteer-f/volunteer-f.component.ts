import { Component, OnInit, EventEmitter, Output, ViewChild } from '@angular/core';
import { Volunteer } from '../../../Classes/Volunteer';
import { DataServiceService } from '../../../Services/data-service.service';
import { VolunteerService } from 'src/app/services/volunteer.service';
import { Form, NgForm } from '@angular/forms';
import { Category } from 'src/app/Classes/Category';
import { Subscription } from 'rxjs';
import { CategoryService } from 'src/app/services/category.service';
import { MatDialogRef } from '@angular/material/dialog';
@Component({
  selector: 'app-volunteer-f',
  templateUrl: './volunteer-f.component.html',
  styleUrls: ['./volunteer-f.component.css']
})
export class VolunteerFComponent implements OnInit {
  categories: Category[] = [];
  mySubscription: Subscription;
  @Output() selectc: EventEmitter<Category[]> = new EventEmitter<Category[]>();
  categoriesSelected: Category[] = [];
  @Output() addedVolunteer: EventEmitter<Volunteer> = new EventEmitter<Volunteer>();
  newVolunteer: Volunteer = new Volunteer('default', '000000000', '000000000', 'default@ddd', 'default', '1999-01-01');
  constructor(public vs: VolunteerService, private cs: CategoryService, private dialogRef: MatDialogRef<VolunteerFComponent>) {
    this.mySubscription = cs.getCategories().subscribe(data => {
      this.categories = data;
      console.log(data);
    });
  }

  @ViewChild('volunteerForm') mytemplateForm: NgForm;

  token = 0;

  ngOnInit() {
  }
  submitForm(f) {
    const tempVolunteer = new Volunteer(f.value.Name, f.value.Telephone, f.value.Pelephone, f.value.Email, f.value.Address, f.value.Age);
    // problems with ngmodel, therefore doing with const object.
    // token returned is saved volunteer id, need to check for null?
    // tslint:disable-next-line: max-line-length
    this.vs.addVolunteer(new Volunteer(f.value.Name, f.value.Telephone, f.value.Pelephone, f.value.Email, f.value.Address, f.value.Age), this.categoriesSelected)
      .then(t => {
        this.token = t as number;
        /////////////////////// need to find out about safe casting in ts
        tempVolunteer.Id = this.token;
        this.categoriesSelected = [];
        this.addedVolunteer.emit(tempVolunteer);
        debugger
        this.dialogRef.close(this.token);
      });
    this.mytemplateForm.resetForm();
    // this.mytemplateForm.form.value =
    // this.mytemplateForm.form.value.Name = 'default';
    // this.mytemplateForm.form.value.Telephone = '000000000';
    // this.mytemplateForm.form.value.Pelephone = '000000000';
    // this.mytemplateForm.form.value.Email = 'default@ddd';
    // this.mytemplateForm.form.value.Age = '0';
    // this.mytemplateForm.form.value.Address = 'default';
    this.newVolunteer = new Volunteer('default', '000000000', '000000000', 'default@ddd', 'default', '1999-01-01');
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
      this.add(element)
    });
     }
}

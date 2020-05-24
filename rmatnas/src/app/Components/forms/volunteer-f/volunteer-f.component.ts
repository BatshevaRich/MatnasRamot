import { Component, OnInit, EventEmitter, Output, ViewChild } from '@angular/core';
import { Volunteer } from '../../../Classes/Volunteer';
import { DataServiceService } from '../../../Services/data-service.service';
import { VolunteerService } from 'src/app/services/volunteer.service';
import { Form, NgForm } from '@angular/forms';
@Component({
  selector: 'app-volunteer-f',
  templateUrl: './volunteer-f.component.html',
  styleUrls: ['./volunteer-f.component.css']
})
export class VolunteerFComponent implements OnInit {
  @Output() addedVolunteer: EventEmitter<Volunteer> = new EventEmitter<Volunteer>();
  newVolunteer: Volunteer = new Volunteer('default', '000000000', '000000000', 'default@ddd', 'default', '0');
  constructor(public vs: VolunteerService) {
  }

  @ViewChild('volunteerForm') mytemplateForm: NgForm;

  ngOnInit() {
  }
  submitForm(f) {
    const tempVolunteer = new Volunteer(f.value.Name, f.value.Telephone, f.value.Pelephone, f.value.Email, f.value.Address, f.value.Age);
    // problems with ngmodel, therefore doing with const object.
    // token returned is saved volunteer id, need to check for null?
    // tslint:disable-next-line: max-line-length
    this.vs.addVolunteer(new Volunteer(f.value.Name, f.value.Telephone, f.value.Pelephone, f.value.Email, f.value.Address, f.value.Age))
      .then(token => {
        /////////////////////// need to find out about safe casting in ts
        tempVolunteer.Id = token as number;
        this.addedVolunteer.emit(tempVolunteer);
      });
    this.mytemplateForm.resetForm();
    // this.mytemplateForm.form.value =
    // this.mytemplateForm.form.value.Name = 'default';
    // this.mytemplateForm.form.value.Telephone = '000000000';
    // this.mytemplateForm.form.value.Pelephone = '000000000';
    // this.mytemplateForm.form.value.Email = 'default@ddd';
    // this.mytemplateForm.form.value.Age = '0';
    // this.mytemplateForm.form.value.Address = 'default';
    this.newVolunteer = new Volunteer('default', '000000000', '000000000', 'default@ddd', 'default', '0');

  ngOnDestroy() {
    if (this.mySubscription) {
      this.mySubscription.unsubscribe();
    }
  }
  }
}

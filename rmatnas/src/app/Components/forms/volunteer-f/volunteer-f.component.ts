import { Component, OnInit } from '@angular/core';
import { Volunteer } from '../../../Classes/Volunteer';
import { DataServiceService } from '../../../Services/data-service.service';
import { VolunteerService } from 'src/app/services/volunteer.service';
@Component({
  selector: 'app-volunteer-f',
  templateUrl: './volunteer-f.component.html',
  styleUrls: ['./volunteer-f.component.css']
})
export class VolunteerFComponent implements OnInit {
  newVolunteer: Volunteer = new Volunteer(1, 'default',  '0', '0', 'default@ddd', 'default', '0');
  constructor(public vs: VolunteerService) {
  }

  ngOnInit() {
  }
  submitForm(f) {
    this.vs.addVolunteer(new Volunteer(this.newVolunteer.Id, this.newVolunteer.Name, this.newVolunteer.Telephone, this.newVolunteer.Pelephone, this.newVolunteer.Email, this.newVolunteer.Address, this.newVolunteer.Age));
    f.reset();
  }
}

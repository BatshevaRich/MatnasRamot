import { Component, OnInit } from '@angular/core';
import {Volunteer} from '../../../Classes/Volunteer';
import { VolunteerService } from 'src/app/services/volunteer.service';
@Component({
  selector: 'app-all-volunteers',
  templateUrl: './all-volunteers.component.html',
  styleUrls: ['./all-volunteers.component.css']
})
export class AllVolunteersComponent implements OnInit {
  volunteers: Volunteer[];
  search = '';
  constructor(public vs: VolunteerService) {

  }

  ngOnInit() {
    this.vs.getVolunteers().subscribe(data => {
      this.volunteers = data;
    });
  }
  delete(v: number) {
    this.vs.removeVolunteer(v);
    this.volunteers = this.volunteers.filter(vo => vo.Id !== v);
  }
}

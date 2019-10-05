import { Component, OnInit } from '@angular/core';
import { Volunteer } from '../../../classes/Volunteer';
import { VolunteerService } from 'src/app/services/volunteer.service';
@Component({
  selector: 'app-all-volunteers',
  templateUrl: './all-volunteers.component.html',
  styleUrls: ['./all-volunteers.component.css']
})
export class AllVolunteersComponent implements OnInit {
  volunteers: Volunteer[] = [];
  search = '';
  constructor(public vs: VolunteerService) {}

  ngOnInit() {
    this.vs.getVolunteers().subscribe(data => {
      this.volunteers = data;
    });
  }
}

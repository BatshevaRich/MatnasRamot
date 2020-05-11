import { Component, OnInit, Input } from '@angular/core';
import { VolunteerService } from 'src/app/services/volunteer.service';
import { Volunteer } from 'src/app/Classes/Volunteer';
import { VolunteerAndFamilyService } from 'src/app/services/volunteer-and-family.service';
import { VolunteerAndFamily } from 'src/app/classes/VolunteerAndFamily';
import { Family } from 'src/app/Classes/Family';
import { FamilyService } from 'src/app/services/family.service';

@Component({
  selector: 'app-all-to-volunteers',
  templateUrl: './all-to-volunteers.component.html',
  styleUrls: ['./all-to-volunteers.component.css']
})
export class AllToVolunteersComponent implements OnInit {

  families: Family[] = [];
  @Input() vId: number;
  search = '';
  constructor(public fs: FamilyService, public vfs: VolunteerAndFamilyService) { }

  ngOnInit() {
    if (this.vId) {
      this.fs.getFamiliesByVolunteer(this.vId).subscribe(data=>{
        this.families = data;
        console.log(data);
      })
     }
    else {
      this.fs.getFamilies().subscribe(data => {
        this.families = data;
      });
    }
  }

}

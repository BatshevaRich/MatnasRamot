import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { VolunteerFComponent } from './Components/forms/volunteer-f/volunteer-f.component';
import { FamilyFComponent } from './Components/forms/family-f/family-f.component';
import { AllVolunteersComponent } from './Components/all/all-volunteers/all-volunteers.component';
import { AddVFComponent } from './Components/forms/add/add-vf/add-vf.component';
import { UserAuth } from './Classes/UserAuth';
import { SecurityService } from './Security/security.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  securityObject: UserAuth = null;
  title = 'endproject';
  constructor(private securityService: SecurityService) {
    this.securityObject = securityService.securityObject;

  }

  logout(): void {
    this.securityService.logout();
  }

}

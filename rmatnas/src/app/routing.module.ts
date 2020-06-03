import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './Components/UI/home/home.component';
import { AddVFComponent } from './Components/forms/add/add-vf/add-vf.component';
import { AllToVolunteersComponent } from './Components/all/all-to-volunteers/all-to-volunteers.component';
import { AllFamiliesComponent } from './Components/all/all-families/all-families.component';
import { AllOrganizationsComponent } from './Components/all/all-organizations/all-organizations.component';
import { AllEventsComponent } from './Components/all/all-events/all-events.component';
import { AllVolunteersComponent } from './Components/all/all-volunteers/all-volunteers.component';
import { VolunteerComponent } from './Components/volunteer/volunteer.component';
import { VolunteerFComponent } from './Components/forms/volunteer-f/volunteer-f.component';
import { FamilyComponent } from './Components/family/family.component';
import { FamilyFComponent } from './Components/forms/family-f/family-f.component';
import { EventComponent } from './Components/event/event.component';
import { EventFComponent } from './Components/forms/event-f/event-f.component';
import { AllTasksComponent } from './Components/all/all-tasks/all-tasks.component';
import { MyTaskComponent } from './Components/task/task.component';
import { OrganizationComponent } from './Components/organization/organization.component';
import { OrganizationFComponent } from './Components/forms/organization-f/organization-f.component';


export const routeList: Routes = [
    { path: '', component: /*VolunteerFComponent*/ HomeComponent },
    { path: 'main', component: /*VolunteerFComponent*/ HomeComponent },
    { path: 'addvf', component: /*VolunteerFComponent*/ AddVFComponent },

    {
      path: 'list',
      children: [
        {
          path: 'vaf', component: AllToVolunteersComponent,
          children: [
            { path: ':vId/volunteers', component: AllFamiliesComponent },
            { path: ':vId/families', component: AllOrganizationsComponent },
            { path: ':vId/events', component: AllEventsComponent }
          ]
        },
        {
          path: 'volunteers', component: AllVolunteersComponent,
          children: [
            { path: ':vId/families', component: AllFamiliesComponent },
            { path: ':vId/organizations', component: AllOrganizationsComponent },
            { path: ':vId/events', component: AllEventsComponent }
          ]
        },
        {
          path: 'families', component: AllFamiliesComponent,
          children: [
            { path: ':vId/volunteers', component: AllVolunteersComponent },
            { path: ':vId/organizations', component: AllOrganizationsComponent },
            { path: ':vId/events', component: AllEventsComponent }
          ]
        },
        {
          path: 'volunteer/:volunteerId', component: VolunteerComponent,
          children: [
            { path: 'families', component: AllFamiliesComponent },
            { path: 'organizations', component: AllOrganizationsComponent },
            { path: 'events', component: AllEventsComponent }
          ]
        },
        { path: 'add-volunteer', component: VolunteerFComponent },
        { path: 'report-volunteer', component: VolunteerComponent },
        { path: 'families', component: AllFamiliesComponent },
        {
          path: 'family/:familyId',
          component: FamilyComponent,
          children: [
            { path: 'volunteers', component: AllVolunteersComponent },
            { path: 'organizations', component: AllOrganizationsComponent },
            { path: 'events', component: AllEventsComponent }
          ]
        },
        { path: 'add-family', component: FamilyFComponent },
        { path: 'report-family', component: FamilyComponent },
        { path: 'events', component: AllEventsComponent },
        {
          path: 'event/:eventId',
          component: EventComponent,
          children: [
            { path: 'families', component: AllFamiliesComponent },
            { path: 'organizations', component: AllOrganizationsComponent },
            { path: 'volunteers', component: AllVolunteersComponent }
          ]
        },
        { path: 'add-event', component: EventFComponent },
        { path: 'organizations', component: AllOrganizationsComponent },
        { path: 'tasks', component: AllTasksComponent },
        { path: 'task/:taskId', component: MyTaskComponent },
        {
          path: 'organization/:organizationId',
          component: OrganizationComponent,
          children: [
            { path: 'families', component: AllFamiliesComponent },
            { path: 'volunteers', component: AllVolunteersComponent },
            { path: 'events', component: AllEventsComponent }
          ]
        },
        { path: 'add-organization', component: OrganizationFComponent }
      ]
    }
  ];

@NgModule({
  imports: [ RouterModule.forRoot(routeList) ],
  exports: [
      RouterModule
   ]
})
export class RoutingModule { }

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { VolunteerComponent } from './Components/volunteer/volunteer.component';
import { FamilyComponent } from './Components/family/family.component';
import { AllFamiliesComponent } from './Components/all/all-families/all-families.component';
import { AllVolunteersComponent } from './Components/all/all-volunteers/all-volunteers.component';
import { FamilyFComponent } from './Components/forms/family-f/family-f.component';
import { VolunteerFComponent } from './Components/forms/volunteer-f/volunteer-f.component';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { DataServiceService } from 'src/app/Services/data-service.service';
import { HomeComponent } from './Components/UI/home/home.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FooterComponent } from './Components/UI/footer/footer.component';
import { AsideComponent } from './Components/UI/aside/aside.component';
import { EventComponent } from './Components/event/event.component';
import { OrganizationComponent } from './Components/organization/organization.component';
import { AllEventsComponent } from './Components/all/all-events/all-events.component';
import { AllOrganizationsComponent } from './Components/all/all-organizations/all-organizations.component';
import { EventFComponent } from './Components/forms/event-f/event-f.component';
import { OrganizationFComponent } from './Components/forms/organization-f/organization-f.component';
import { MyTaskComponent } from './Components/task/task.component';
import { AllTasksComponent } from './Components/all/all-tasks/all-tasks.component';
import { BorderDirective } from './Directives/border.directive';
import { PhoneMaskDirective } from './Directives/phone-mask.directive';
import { HttpClientModule } from '@angular/common/http';
import { TaskFComponent } from './Components/forms/task-f/task-f.component';
import { PhonePipe } from './Pipes/phone.pipe';
import { FilterPipe } from './Pipes/filter.pipe';
import { CategoryComponent } from './Components/category/category.component';
import { ChooseCategoryComponent } from './Components/choose-category/choose-category.component';
export const routeList: Routes = [
  { path: '', component: /*VolunteerFComponent*/ HomeComponent },
  { path: 'main', component: /*VolunteerFComponent*/ HomeComponent },
  {
    path: 'list',
    children: [
      { path: 'volunteers', component: AllVolunteersComponent },
      {
        path: 'volunteer/:volunteerId',
        component: VolunteerComponent,
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
  declarations: [
    AppComponent,
    VolunteerComponent,
    VolunteerFComponent,
    AllVolunteersComponent,
    FamilyComponent,
    FamilyFComponent,
    AllFamiliesComponent,
    EventComponent,
    AllEventsComponent,
    EventFComponent,
    OrganizationComponent,
    OrganizationFComponent,
    AllOrganizationsComponent,
    HomeComponent,
    FooterComponent,
    AsideComponent,
    MyTaskComponent,
    CategoryComponent,
    ChooseCategoryComponent,
    AllTasksComponent,
    BorderDirective,
    PhoneMaskDirective,
    TaskFComponent,
    PhonePipe,
    FilterPipe
  ],
  imports: [
    BrowserModule,
    FormsModule,
    RouterModule.forRoot(routeList),
    BrowserAnimationsModule,
    HttpClientModule
  ],
  providers: [DataServiceService],
  bootstrap: [AppComponent]
})
export class AppModule {}

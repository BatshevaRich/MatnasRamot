import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './Components/UI/home/home.component';
import { AllToVolunteersComponent } from './Components/all/all-to-volunteers/all-to-volunteers.component';
import { AllFamiliesComponent } from './Components/all/all-families/all-families.component';
import { AllOrganizationsComponent } from './Components/all/all-organizations/all-organizations.component';
import { AllEventsComponent } from './Components/all/all-events/all-events.component';
import { AllVolunteersComponent } from './Components/all/all-volunteers/all-volunteers.component';
import { AllTasksComponent } from './Components/all/all-tasks/all-tasks.component';
import { MyTaskComponent } from './Components/single/task/task.component';
import { MainComponent } from './Components/UI/main/main.component';
import { LoginComponent } from './Components/security/login/login.component';


export const routeList: Routes = [
  { path: 'login', component: LoginComponent },
  { path: '', component: HomeComponent },
  { path: 'home', component: HomeComponent },
  { path: 'main', component: MainComponent },
  {
    path: 'list', children: [
      { path: 'vaf', component: AllToVolunteersComponent },
      { path: 'volunteers', component: AllVolunteersComponent },
      { path: 'families', component: AllFamiliesComponent },
      { path: 'events', component: AllEventsComponent },
      { path: 'organizations', component: AllOrganizationsComponent },
      { path: 'tasks', component: AllTasksComponent },
      { path: 'task/:taskId', component: MyTaskComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routeList)],
  exports: [
    RouterModule
  ]
})
export class RoutingModule { }

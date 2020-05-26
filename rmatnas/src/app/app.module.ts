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
import { AddVFComponent } from './Components/forms/add/add-vf/add-vf.component';
import { AddVEComponent } from './Components/forms/add/add-ve/add-ve.component';
import { AddVGComponent } from './Components/forms/add/add-vg/add-vg.component';
import { AddFOComponent } from './Components/forms/add/add-fo/add-fo.component';
import { CategoryFComponent } from './Components/forms/category-f/category-f.component';
import { AllToVolunteersComponent } from './Components/all/all-to-volunteers/all-to-volunteers.component';
//import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ModuleWithProviders } from '@angular/core';
import { MAT_LABEL_GLOBAL_OPTIONS, MatNativeDateModule, MAT_DATE_LOCALE } from '@angular/material/core';
import { MatIconRegistry } from '@angular/material/icon';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatBadgeModule } from '@angular/material/badge';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatChipsModule } from '@angular/material/chips';
import { MatStepperModule } from '@angular/material/stepper';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule } from '@angular/material/dialog';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatRadioModule } from '@angular/material/radio';
import { MatRippleModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSliderModule } from '@angular/material/slider';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatTreeModule } from '@angular/material/tree';
import { MatDividerModule } from '@angular/material/divider';
import { ToVolunteerComponent } from './Components/to-volunteer/to-volunteer.component';
import { ConfirmDialogComponent } from './Components/forms/confirm-dialog/confirm-dialog.component';
import { HeaderComponent } from './Components/UI/header/header.component';

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
    FilterPipe,
    AddVFComponent,
    AddVEComponent,
    AddVGComponent,
    AddFOComponent,
    AllToVolunteersComponent,
    ToVolunteerComponent,
    CategoryFComponent,
    ConfirmDialogComponent,
    HeaderComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    RouterModule.forRoot(routeList),
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    MatTableModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatInputModule,
    MatPaginatorModule,
    MatProgressSpinnerModule,
    MatSortModule,
    MatAutocompleteModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatCardModule,
    MatCheckboxModule,
    MatChipsModule,
    MatDatepickerModule,
    MatDialogModule,
    MatDividerModule,
    MatExpansionModule,
    MatGridListModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatNativeDateModule,
    MatPaginatorModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatRadioModule,
    MatRippleModule,
    MatSelectModule,
    MatSidenavModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatSnackBarModule,
    MatSortModule,
    MatStepperModule,
    MatTableModule,
    MatTabsModule,
    MatToolbarModule,
    MatTooltipModule,
    MatIconModule,
    // FontAwesomeModule
  ],

  providers: [DataServiceService],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(matIconRegistry: MatIconRegistry) {
    matIconRegistry.registerFontClassAlias('fontawesome', 'fa');
  }
}

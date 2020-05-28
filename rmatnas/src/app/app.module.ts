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
import { MatIconRegistry } from '@angular/material/icon';
import { MatTableExporterModule } from 'mat-table-exporter';
import { ToVolunteerComponent } from './Components/to-volunteer/to-volunteer.component';
import { ConfirmDialogComponent } from './Components/forms/confirm-dialog/confirm-dialog.component';
import { HeaderComponent } from './Components/UI/header/header.component';
import { RoutingModule } from './routing.module';
import { MaterialModule } from './material.module';
import { MatTableExporterModule } from 'mat-table-exporter';
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
    RoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    MaterialModule,
    MatTableExporterModule
  ],
  providers: [DataServiceService],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(matIconRegistry: MatIconRegistry) {
    matIconRegistry.registerFontClassAlias('fontawesome', 'fa');
  }
}

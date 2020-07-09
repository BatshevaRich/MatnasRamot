import { BrowserModule } from '@angular/platform-browser';
import { NgModule, APP_INITIALIZER } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { AppComponent } from './app.component';
import { VolunteerComponent } from './Components/single/volunteer/volunteer.component';
import { FamilyComponent } from './Components/single/family/family.component';
import { AllFamiliesComponent } from './Components/all/all-families/all-families.component';
import { AllVolunteersComponent } from './Components/all/all-volunteers/all-volunteers.component';
import { FamilyFComponent } from './Components/forms/family-f/family-f.component';
import { VolunteerFComponent } from './Components/forms/volunteer-f/volunteer-f.component';
import { HomeComponent } from './Components/UI/home/home.component';
import { FooterComponent } from './Components/UI/footer/footer.component';
import { EventComponent } from './Components/single/event/event.component';
import { OrganizationComponent } from './Components/single/organization/organization.component';
import { AllEventsComponent } from './Components/all/all-events/all-events.component';
import { AllOrganizationsComponent } from './Components/all/all-organizations/all-organizations.component';
import { EventFComponent } from './Components/forms/event-f/event-f.component';
import { OrganizationFComponent } from './Components/forms/organization-f/organization-f.component';
import { MyTaskComponent } from './Components/single/task/task.component';
import { AllTasksComponent } from './Components/all/all-tasks/all-tasks.component';
import { BorderDirective } from './Directives/border.directive';
import { PhoneMaskDirective } from './Directives/phone-mask.directive';
import { TaskFComponent } from './Components/forms/task-f/task-f.component';
import { PhonePipe } from './Pipes/phone.pipe';
import { FilterPipe } from './Pipes/filter.pipe';
import { ChooseCategoryComponent } from './Components/single/choose-category/choose-category.component';
import { AddVFComponent } from './Components/forms/add/add-vf/add-vf.component';
import { AddVEComponent } from './Components/forms/add/add-ve/add-ve.component';
import { AddVGComponent } from './Components/forms/add/add-vg/add-vg.component';
import { AddFOComponent } from './Components/forms/add/add-fo/add-fo.component';
import { CategoryFComponent } from './Components/forms/category-f/category-f.component';
import { AllToVolunteersComponent } from './Components/all/all-to-volunteers/all-to-volunteers.component';
import { ToVolunteerComponent } from './Components/single/to-volunteer/to-volunteer.component';
import { ConfirmDialogComponent } from './Components/UI/confirm-dialog/confirm-dialog.component';
import { HeaderComponent } from './Components/UI/header/header.component';
import { RoutingModule } from './routing.module';
import { MaterialModule } from './material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { DatePipe } from '@angular/common';
import { MainComponent } from './Components/UI/main/main.component';
import { SpinnerComponent } from './Components/UI/spinner/spinner.component';
import { ErrorComponent } from './Components/UI/error/error.component';
import { SatDatepickerModule, SatNativeDateModule } from 'saturn-datepicker';
import { RangesFooter } from './Components/UI/ranges-footer/ranges-footer.component';
import { getHebrewPaginatorIntl } from './Components/UI/hebrew-paginator-intl';
import { MatBadgeModule } from '@angular/material/badge';
import { MatPaginatorIntl } from '@angular/material/paginator';
import { MatSpinner } from '@angular/material/progress-spinner';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { ChartsModule } from 'ng2-charts';
import { MatIconRegistry } from '@angular/material/icon';
import * as WebFont from 'webfontloader';
import { NotificationService } from './services/notification.service';
import { LoginComponent } from './Components/security/login/login.component';
WebFont.load({
  custom: { families: ['Material Icons', 'Material Icons Outline'], }
});

export function startupServiceFactory(startupService: NotificationService) {
  console.log('startupService', startupService);
  return () => startupService.loadAll(); // => required, otherwise `this` won't work inside StartupService::load
}
@NgModule({
  imports: [
    ReactiveFormsModule,
    BrowserModule,
    FormsModule,
    RoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    MaterialModule,
    FlexLayoutModule,
    ChartsModule,
    ReactiveFormsModule,
    SatDatepickerModule,
    SatNativeDateModule,
    ScrollingModule,
    DragDropModule,
    MatBadgeModule
  ],
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
    MyTaskComponent,
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
    HeaderComponent,
    MainComponent,
    RangesFooter,
    SpinnerComponent,
    ErrorComponent,
    LoginComponent
  ],
  entryComponents: [RangesFooter],
  providers: [DatePipe, MatPaginatorIntl, NotificationService,
    {
      provide: APP_INITIALIZER,
      useFactory: startupServiceFactory,
      deps: [NotificationService],
      multi: true
    },
    { provide: MatPaginatorIntl, useValue: getHebrewPaginatorIntl() }],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(matIconRegistry: MatIconRegistry) {
    matIconRegistry.registerFontClassAlias('fontawesome', 'fa');
  }
}

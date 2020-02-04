import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ToVolunteerComponent } from './to-volunteer.component';

describe('ToVolunteerComponent', () => {
  let component: ToVolunteerComponent;
  let fixture: ComponentFixture<ToVolunteerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ToVolunteerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ToVolunteerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

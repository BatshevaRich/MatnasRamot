import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VolunteerFamilyComponent } from './volunteer-family.component';

describe('VolunteerFamilyComponent', () => {
  let component: VolunteerFamilyComponent;
  let fixture: ComponentFixture<VolunteerFamilyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VolunteerFamilyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VolunteerFamilyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

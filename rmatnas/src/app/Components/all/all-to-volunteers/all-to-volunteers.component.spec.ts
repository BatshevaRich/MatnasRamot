import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AllToVolunteersComponent } from './all-to-volunteers.component';

describe('AllToVolunteersComponent', () => {
  let component: AllToVolunteersComponent;
  let fixture: ComponentFixture<AllToVolunteersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AllToVolunteersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AllToVolunteersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

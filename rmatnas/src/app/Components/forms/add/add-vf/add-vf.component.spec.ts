import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddVFComponent } from './add-vf.component';

describe('AddVFComponent', () => {
  let component: AddVFComponent;
  let fixture: ComponentFixture<AddVFComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddVFComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddVFComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

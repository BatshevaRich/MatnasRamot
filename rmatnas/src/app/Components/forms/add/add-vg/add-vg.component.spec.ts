import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddVGComponent } from './add-vg.component';

describe('AddVGComponent', () => {
  let component: AddVGComponent;
  let fixture: ComponentFixture<AddVGComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddVGComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddVGComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

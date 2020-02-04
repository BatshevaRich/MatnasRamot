import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddVEComponent } from './add-ve.component';

describe('AddVEComponent', () => {
  let component: AddVEComponent;
  let fixture: ComponentFixture<AddVEComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddVEComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddVEComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddFOComponent } from './add-fo.component';

describe('AddFOComponent', () => {
  let component: AddFOComponent;
  let fixture: ComponentFixture<AddFOComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddFOComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddFOComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

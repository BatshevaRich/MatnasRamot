import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoryFComponent } from './category-f.component';

describe('CategoryFComponent', () => {
  let component: CategoryFComponent;
  let fixture: ComponentFixture<CategoryFComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CategoryFComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CategoryFComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

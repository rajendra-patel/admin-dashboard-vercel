import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditcouponsComponent } from './editcoupons.component';

describe('EditcouponsComponent', () => {
  let component: EditcouponsComponent;
  let fixture: ComponentFixture<EditcouponsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditcouponsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditcouponsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListcouponsComponent } from './listcoupons.component';

describe('ListcouponsComponent', () => {
  let component: ListcouponsComponent;
  let fixture: ComponentFixture<ListcouponsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListcouponsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListcouponsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarsSlidingComponent } from './cars-sliding.component';

describe('CarsSlidingComponent', () => {
  let component: CarsSlidingComponent;
  let fixture: ComponentFixture<CarsSlidingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CarsSlidingComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CarsSlidingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

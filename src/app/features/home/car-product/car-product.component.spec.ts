import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarProductComponent } from './car-product.component';

describe('CarProductComponent', () => {
  let component: CarProductComponent;
  let fixture: ComponentFixture<CarProductComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CarProductComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CarProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

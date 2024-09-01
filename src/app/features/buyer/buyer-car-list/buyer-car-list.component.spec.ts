import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuyerCarListComponent } from './buyer-car-list.component';

describe('BuyerCarListComponent', () => {
  let component: BuyerCarListComponent;
  let fixture: ComponentFixture<BuyerCarListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BuyerCarListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BuyerCarListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

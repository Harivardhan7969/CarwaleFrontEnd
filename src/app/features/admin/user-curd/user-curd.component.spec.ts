import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserCurdComponent } from './user-curd.component';

describe('UserCurdComponent', () => {
  let component: UserCurdComponent;
  let fixture: ComponentFixture<UserCurdComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserCurdComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserCurdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

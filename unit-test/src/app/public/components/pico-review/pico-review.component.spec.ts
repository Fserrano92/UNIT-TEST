import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PicoReviewComponent } from './pico-review.component';

describe('PicoReviewComponent', () => {
  let component: PicoReviewComponent;
  let fixture: ComponentFixture<PicoReviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PicoReviewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PicoReviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

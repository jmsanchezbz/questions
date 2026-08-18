import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckIndicatorComponent } from './check-indicator.component';

describe('CheckIndicatorComponent', () => {
  let component: CheckIndicatorComponent;
  let fixture: ComponentFixture<CheckIndicatorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CheckIndicatorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CheckIndicatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

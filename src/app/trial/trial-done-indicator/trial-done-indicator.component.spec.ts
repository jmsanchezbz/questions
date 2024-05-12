import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrialDoneIndicatorComponent } from './trial-done-indicator.component';

describe('TrialDoneIndicatorComponent', () => {
  let component: TrialDoneIndicatorComponent;
  let fixture: ComponentFixture<TrialDoneIndicatorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TrialDoneIndicatorComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TrialDoneIndicatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

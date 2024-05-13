import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrialStatsDlgComponent } from './trial-stats-dlg.component';

describe('TrialStatsDlgComponent', () => {
  let component: TrialStatsDlgComponent;
  let fixture: ComponentFixture<TrialStatsDlgComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TrialStatsDlgComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TrialStatsDlgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

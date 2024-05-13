import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrialDlgComponent } from './trial-dlg.component';

describe('TrialDlgComponent', () => {
  let component: TrialDlgComponent;
  let fixture: ComponentFixture<TrialDlgComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TrialDlgComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TrialDlgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

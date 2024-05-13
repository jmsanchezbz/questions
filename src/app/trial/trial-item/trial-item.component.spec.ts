import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrialItemComponent } from './trial-item.component';

describe('TrialItemComponent', () => {
  let component: TrialItemComponent;
  let fixture: ComponentFixture<TrialItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TrialItemComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TrialItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

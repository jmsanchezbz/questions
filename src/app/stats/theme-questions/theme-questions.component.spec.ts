import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ThemeQuestionsComponent } from './theme-questions.component';

describe('ThemeQuestionsComponent', () => {
  let component: ThemeQuestionsComponent;
  let fixture: ComponentFixture<ThemeQuestionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ThemeQuestionsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ThemeQuestionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

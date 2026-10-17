/// <reference types="jasmine" />
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Question } from '../../model/question';
import { TrialQuestion } from '../../model/trial-question';
import { QuestionItemComponent } from './question-item.component';

describe('QuestionItemComponent', () => {
  let component: QuestionItemComponent;
  let fixture: ComponentFixture<QuestionItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QuestionItemComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(QuestionItemComponent);
    component = fixture.componentInstance;
    component.tQuestion = new TrialQuestion(
      1,
      1,
      10,
      2,
      false,
      new Date(),
      new Date(),
      new Question(
        10,
        'admin',
        'group',
        'theme',
        1,
        'Question?',
        'A',
        'B',
        'C',
        'D',
        2,
        'Explanation',
        true
      )
    );
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should clear the selected answer when the same option is chosen again', () => {
    component.selected = 2;

    component.onAnswerChange({ value: 2, source: { checked: true } } as any);

    expect(component.selected).toBeNull();
    expect(component.tQuestion.answer).toBeNull();
    expect(component.tQuestion.is_right).toBeFalse();
  });
});

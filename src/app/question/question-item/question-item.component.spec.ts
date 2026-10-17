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

  it('should send an answer if it is different than previously selected and trial is not finished', () => {
    spyOn(component['answerSelected'], 'emit');
    component.tQuestion.answer = 2;
    component.selected = 2;
    component.trialCompleted = false;

    component.onAnswerChange({ value: 3 } as any);

    expect(component.selected).toBe(3);
    expect(component.tQuestion.answer).toBe(3);
    expect(component['answerSelected'].emit).toHaveBeenCalledWith(component.tQuestion);
  });

  it('should not send an answer if it is the same as previously selected', () => {
    spyOn(component['answerSelected'], 'emit');
    component.tQuestion.answer = 2;
    component.selected = 2;
    component.trialCompleted = false;

    component.onAnswerChange({ value: 2 } as any);

    expect(component['answerSelected'].emit).not.toHaveBeenCalled();
    expect(component.tQuestion.answer).toBe(2);
  });

  it('should not send an answer if trial is completed', () => {
    spyOn(component['answerSelected'], 'emit');
    component.tQuestion.answer = 2;
    component.selected = 2;
    component.trialCompleted = true;

    component.onAnswerChange({ value: 3 } as any);

    expect(component['answerSelected'].emit).not.toHaveBeenCalled();
    expect(component.tQuestion.answer).toBe(2);
  });
});

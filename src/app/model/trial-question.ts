import { Question } from "./question";

export class TrialQuestion {
  constructor(
    public id: number,
    public trial_id: number,
    public question_id: number,
    public answer: number|null,
    public is_right: boolean,
    public created_at: Date,
    public updated_at: Date,
    public question: Question
  ) {}

  static from(question: Question): TrialQuestion {
    return new TrialQuestion(
      0,
      0,
      question.id,
      null,
      false,
      new Date(),
      new Date(),
      question
    );
  }

  static getBasic(trialQuestion: TrialQuestion){
    return {
        id: trialQuestion.id,
        trial_id: trialQuestion.trial_id,
        question_id: trialQuestion.question_id,
        answer: trialQuestion.answer,
        is_right: trialQuestion.is_right
    }
  }
}

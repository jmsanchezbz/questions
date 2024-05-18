import { TrialQuestion } from "./trial-question";

export class Trial {
  constructor(
    public id: number,
    public name: string,
    public administration: string,
    public grup: string,
    public theme: string,
    public num_questions: number,
    public num_mistakes: number,
    public is_completed: boolean,
    public user_id: number,
    public created_at: Date,
    public updated_at: Date,
    public trial_questions: TrialQuestion[]
  ) {}

  static sortByUpdatedAtDesc(trials: Trial[]): Trial[] {
    return trials.sort((a, b) => new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime());
  }

  static close(trial: Trial) {
    if (!trial.is_completed) {
      trial.num_mistakes = Trial.countMistakes(trial);
      trial.is_completed = true;
    }

    return trial;
  }

  static countMistakes(trial: Trial) {
    const num = trial.trial_questions.reduce(
      (acc, tq) => acc + (!tq.is_right ? 1 : 0),
      0
    );

    return num;
  }

  static countRight(trial: Trial) {
    const num = trial.trial_questions.reduce(
      (acc, tq) => acc + (tq.is_right ? 1 : 0),
      0
    );

    return num;
  }

  static countUnanswered(trial: Trial) {
    const num = trial.trial_questions.reduce(
      (acc, tq) => acc + (tq.answer === null ? 1 : 0),
      0
    );

    return num;
  }
}

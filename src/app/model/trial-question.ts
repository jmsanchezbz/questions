import { Question } from './question'

export class TrialQuestion {

    constructor(
        public id: number,
        public trial_id: number,
        public question_id: number,
        public answer: string,
        public is_right: boolean,
        public created_at: Date,
        public updated_at: Date,
        public question: Question
    ){}
}

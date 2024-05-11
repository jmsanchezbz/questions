import { TrialQuestion } from './trial-question'

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
    ){}
}

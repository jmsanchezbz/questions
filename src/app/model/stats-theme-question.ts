export class StatsThemeQuestion {
    constructor(
        public administration: string,
        public grup: string,
        public theme: string,
        public question_id: number,
        public number: number,
        public question: string,
        public right_questions: number,
        public wrong_questions: number,
        public balance: number
    ){}
}

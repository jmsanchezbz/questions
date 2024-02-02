export class Question {
    constructor(
        public id: number,
        public administration: string,
        public grup: string,
        public theme: string,
        public number: number,
        public question: string,
        public option1: string,
        public option2: string,
        public option3: string,
        public option4: string,
        public answer: number,
        public explanation: string,
        public verified: boolean
      ) {}
}

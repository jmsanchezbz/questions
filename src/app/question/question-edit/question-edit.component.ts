import { Component } from '@angular/core';
import { Question } from '../../model/question';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-question-edit',
  templateUrl: './question-edit.component.html',
  styleUrl: './question-edit.component.css'
})
export class QuestionEditComponent {
  public question: Question;
  public questionForm: FormGroup;
  public answerForm: FormGroup;

  constructor(private route: ActivatedRoute, private fb: FormBuilder) {
    this.createFormQuestion();
    this.createFormAnswer();
  }

  ngOnInit() {
    this.route.data.subscribe((data: { Question: Question }) => {
      console.log("QuestionEditComponent:", data.Question);

      this.question = data.Question;
    });
  }

  createFormQuestion() {
    this.questionForm = this.fb.group({
      answer: new FormControl("", [Validators.required]),
    });
  }

  createFormAnswer() {
    this.answerForm = this.fb.group({
      verified: new FormControl(this.question.verified, []),
    });
  }

  submitQuestion() {
    if (this.questionForm.valid) {
      console.log('Valid question form');
    }
  }

  submitAnswer() {
    if (this.answerForm.valid) {
      console.log('Valid answer form');
    }
  }
}

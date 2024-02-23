import { Component } from "@angular/core";
import { Question } from "../../model/question";
import { ActivatedRoute } from "@angular/router";
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from "@angular/forms";
import { QuestionService } from "../../services/question.service";
import { catchError, of } from "rxjs";

@Component({
  selector: "app-question-edit",
  templateUrl: "./question-edit.component.html",
  styleUrl: "./question-edit.component.css",
})
export class QuestionEditComponent {
  public question: Question;
  public questionForm: FormGroup;
  public answerForm: FormGroup;
  public feedback: string;

  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private questionService: QuestionService
  ) {}

  ngOnInit() {
    this.route.data.subscribe((data: { Question: Question }) => {
      console.log("QuestionEditComponent:", data.Question);

      this.question = data.Question;

      this.createFormAnswer();
    });
  }

  ngAfterViewInit() {}

  createFormQuestion() {
    this.questionForm = this.fb.group({
      //answer: new FormControl("", [Validators.required]),
    });
  }

  createFormAnswer() {
    this.answerForm = this.fb.group({
      answer: new FormControl(this.question.answer, [Validators.required]),
      explanation: new FormControl(this.question.explanation, [
        Validators.required,
        Validators.maxLength(1000),
      ]),
      verified: new FormControl(this.question.verified, []),
      seccode: new FormControl(null),
    });
  }

  submitQuestion() {
    if (this.questionForm.valid) {
      console.log("Valid question form");
    }
  }

  submitAnswer() {
    if (this.answerForm.valid) {
      this.feedback = "Valid form";
      this.question = { ...this.question, ...this.answerForm.value };

      this.questionService
        .update(this.question, this.answerForm.get("seccode").value)
        .pipe(
          catchError((error) => {
            console.error("Error QuestionEdit.update:", error);

            this.feedback = `Error ${error.error.msg}`;
            return of(error.error.msg);
          })
        )
        .subscribe((question: Question) => {
          this.feedback = `Question id(${question.id}) succesfully updated`;
          console.log("QuestionEdit.submitAnswer", question);
        });
    } else {
      this.feedback = "Invalid form";
      console.log("Valid answer form");
    }
  }
}

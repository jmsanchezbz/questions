import { Component } from "@angular/core";
import { Question } from "../../model/question";
import { ActivatedRoute } from "@angular/router";
import { Observable } from "rxjs";
import { QuestionService } from "../../services/question.service";
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from "@angular/forms";

@Component({
  selector: "app-question-detail",
  templateUrl: "./question-detail.component.html",
  styleUrl: "./question-detail.component.css",
})
export class QuestionDetailComponent {
  public question: Question;
  public selectedAnswer: number = null;
  public questionForm: FormGroup;
  public feedback: string;
  public isVisible: boolean = false;

  constructor(private route: ActivatedRoute, private fb: FormBuilder) {
    this.createForm();
  }

  ngOnInit() {
    this.route.data.subscribe((data: { Question: Question }) => {
      console.log("QuestionDetailComponent:", data.Question);

      this.question = data.Question;
    });
  }

  createForm() {
    this.questionForm = this.fb.group({
      answer: new FormControl("", [Validators.required]),
    });
  }

  checkAnswer() {
    if (this.selectedAnswer == 1) {
      console.log("The selected answer is 1", this.selectedAnswer);
    } else {
      console.log("The selected answer is not 1", this.selectedAnswer);
    }
  }

  toggleAnswer() {
    this.isVisible = !this.isVisible;
  }

  submit() {
    if (this.questionForm.valid) {
      if (this.question.answer) {
        if (this.questionForm.value == this.question.answer) {
          this.feedback = "Correct answer";
        } else {
          this.feedback = "Incorrect answer";
        }
      } else {
        this.feedback = "There is no answer for this question";
      }
    } else {
        console.log("Invalid form ", this.questionForm.value);
      }
  }
}

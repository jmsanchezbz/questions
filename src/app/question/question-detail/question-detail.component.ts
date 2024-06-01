import { Component } from "@angular/core";
import { Question } from "../../model/question";
import { ActivatedRoute, Router } from "@angular/router";
import { catchError, Observable, of } from "rxjs";
import { QuestionService } from "../../services/question.service";
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
  FormsModule,
  ReactiveFormsModule,
} from "@angular/forms";
import { UserStoreService } from "../../services/user-store.service";
import { CommonModule, NgClass, NgIf } from "@angular/common";
import { User } from "../../model/user";
import { MatIconModule } from "@angular/material/icon";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatSelectModule } from "@angular/material/select";
import { MatInputModule } from "@angular/material/input";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { MatButtonModule } from "@angular/material/button";
import { HttpErrorResponse } from "@angular/common/http";
import { SharedService } from "../../shared/services/shared.service";

@Component({
  selector: "app-question-detail",
  templateUrl: "./question-detail.component.html",
  styleUrl: "./question-detail.component.scss",
  standalone: true,
  imports: [
    CommonModule,
    NgIf,
    FormsModule,
    ReactiveFormsModule,
    NgClass,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatCheckboxModule,
    MatButtonModule,
  ],
})
export class QuestionDetailComponent {
  public question: Question;
  public questionForm: FormGroup;
  public answerForm: FormGroup;
  public feedback: string;
  public user: User;
  public isUserAdmin: boolean = false;

  private message: string;
  private responseOK: boolean;
  private errorResponse: any;

  public themes: number[] = Array(30)
    .fill(0)
    .map((_, index) => index + 1);
  public groups: string[] = ["A1", "A2"];

  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private router: Router,
    private questionService: QuestionService,
    private userStoreSvc: UserStoreService,
    private sharedService: SharedService
  ) {}

  ngOnInit() {
    this.route.data.subscribe((data: { Question: Question }) => {
      console.log(
        "QuestionDetailComponent:",
        data.Question,
        this.userStoreSvc.getUser()
      );

      this.initUser(this.userStoreSvc.getUser());

      this.question = data.Question;

      if (this.isUserAdmin) {
        this.createFormQuestion();
      } else {
        this.createFormAnswer();
      }
    });
  }

  ngAfterViewInit() {}

  private initUser(user: User) {
    if (user) {
      this.user = user;
      this.isUserAdmin = this.user.role == "admin";
    }
  }

  private createFormQuestion() {
    this.questionForm = this.fb.group({
      administration: new FormControl(this.question.administration, [
        Validators.required,
      ]),
      grup: new FormControl(this.question.grup, [Validators.required]),
      theme: new FormControl(this.question.theme, [Validators.required]),
      number: new FormControl(this.question.number, [Validators.required]),
      question: new FormControl(this.question.question, [Validators.required]),
      option1: new FormControl(this.question.option1, [
        Validators.required,
        Validators.maxLength(1000),
      ]),
      option2: new FormControl(this.question.option2, [
        Validators.required,
        Validators.maxLength(1000),
      ]),
      option3: new FormControl(this.question.option3, [
        Validators.required,
        Validators.maxLength(1000),
      ]),
      option4: new FormControl(this.question.option4, [
        Validators.required,
        Validators.maxLength(1000),
      ]),
      answer: new FormControl(this.question.answer?.toString(), []),
      explanation: new FormControl(this.question.explanation, [
        Validators.maxLength(1500),
      ]),
      verified: new FormControl(this.question.verified, []),
    });
  }

  private createFormAnswer() {
    this.answerForm = this.fb.group({
      answer: new FormControl(this.question.answer?.toString(), []),
      explanation: new FormControl(this.question.explanation, [
        Validators.maxLength(1500),
      ]),
    });
  }

  submitQuestion() {
    console.log(
      "QuestionDetail-submitQuestion()",
      this.question,
      this.questionForm.value,
      this.questionForm
    );

    if (this.questionForm.valid) {
      this.feedback = "Valid form";
      this.question = { ...this.question, ...this.questionForm.value };

      this.questionService
        .update(this.question)
        .pipe(
          catchError((error) => {
            console.error("Error QuestionDetail.submitQuestion:", error);

            this.feedback = `Error ${error.error.msg}`;
            return of(error.error.msg);
          })
        )
        .subscribe({
          next: (response) => {
            console.log("QuestionDetail response: ", response);
            this.responseOK = true;
            if (response) {
              this.message = response.msg;
            }
          },
          error: async (error: HttpErrorResponse) => {
            console.error("QuestionDetail.submitQuestion error: ", error);
            this.message = error.message;
            this.errorResponse = error;
            this.responseOK = false;
            await this.sharedService.managementToast(
              "feedback",
              this.responseOK,
              this.errorResponse
            );
          },
          complete: async () => {
            await this.sharedService.managementToast(
              "feedback",
              this.responseOK,
              this.errorResponse
            );

            if (this.responseOK) {
              this.router.navigate([""]);
            }
          },
        });
    } else {
      this.feedback = "Invalid form";
      console.log("Valid answer form");
    }
  }

  submitAnswer() {
    if (this.answerForm.valid) {
      this.feedback = "Valid form";
      this.question = { ...this.question, ...this.answerForm.value };

      this.questionService
        .update(this.question)
        .pipe(
          catchError((error) => {
            console.error("QuestionDetail.submitAnswer:", error);

            this.feedback = `Error ${error.error.msg}`;
            return of(error.error.msg);
          })
        )
        .subscribe((question: Question) => {
          this.feedback = `Question id(${question.id}) succesfully updated`;
          console.log("QuestionDetail.submitAnswer", question);
        });
    } else {
      this.feedback = "Invalid form";
      console.log(this.feedback);
    }
  }

  goHome() {
    this.router.navigate([""]);
  }
}

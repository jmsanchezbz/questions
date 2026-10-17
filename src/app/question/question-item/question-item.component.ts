import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ChangeDetectionStrategy
} from "@angular/core";
import { Question } from "../../model/question";
import { NgClass } from "@angular/common";
import { Router } from "@angular/router";
import { MatRadioModule } from "@angular/material/radio";
import { FormsModule } from "@angular/forms";
import { MatIconModule } from "@angular/material/icon";
import { MatDialog, MatDialogModule } from "@angular/material/dialog";
import { CheckIndicatorComponent } from "../../shared/components/check-indicator/check-indicator.component";
import { QuestionDlgComponent } from "../../shared/components/question-dlg/question-dlg.component";
import { TrialQuestion } from "../../model/trial-question";
import { UserService } from "../../services/user.service";
import { MatButtonModule } from "@angular/material/button";

@Component({
    selector: "app-question-item",
    templateUrl: "./question-item.component.html",
    styleUrl: "./question-item.component.scss",
    changeDetection: ChangeDetectionStrategy.Eager,
    imports: [
    FormsModule,
    MatRadioModule,
    MatIconModule,
    CheckIndicatorComponent,
    NgClass,
    MatButtonModule
]
})
export class QuestionItemComponent implements OnInit {
  @Input() tQuestion: TrialQuestion;
  @Input() index: number;
  @Input() trialCompleted: boolean = false;
  @Output() private answerSelected: EventEmitter<TrialQuestion>;

  myIndex: number;
  question: Question;
  valid: Boolean = null;

  public showAnswer: boolean = false;
  selected: number = null;

  constructor(
    public dialog: MatDialog,
    private userSvc: UserService,
    private router: Router
  ) {
    this.answerSelected = new EventEmitter<TrialQuestion>();
  }

  ngOnInit(): void {
    this.selected = this.tQuestion.answer ? this.tQuestion.answer : null;
    this.question = this.tQuestion.question;
    this.myIndex = this.index == -1 ? this.question.number : this.index + 1;
  }

  openDialog() {
    const dialogRef = this.dialog.open(QuestionDlgComponent, {
      data: this.question,
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log(`QuestionItem-openDialog: ${result}`);
    });
  }

  toggleShowAnswer() {
    this.showAnswer = !this.showAnswer;
  }

  onAnswerChange(event: any) {
    if (this.trialCompleted) {
      return;
    }

    const newValue = event?.value ?? null;

    if (newValue !== null && this.selected === newValue) {
      this.selected = null;
      this.tQuestion.answer = null;
      this.tQuestion.is_right = false;
      this.answerSelected.emit(this.tQuestion);
      return;
    }

    this.selected = newValue;
    this.updateTQ();
  }

  updateTQ() {
    if (!this.trialCompleted && this.tQuestion.id != 0) {
      this.tQuestion.answer = this.selected;
      this.tQuestion.is_right = this.selected == this.tQuestion.question.answer;
      console.log(
        "--------updateTQ",
        this.selected,
        this.tQuestion.question.answer,
        this.selected == this.tQuestion.question.answer
      );

      this.answerSelected.emit(this.tQuestion);
    }
  }

  isAdmin(): boolean {
    return this.userSvc.isAdmin();
  }

  isAuthenticated(): boolean {
    return this.userSvc.isAuthenticated();
  }

  isRight(): boolean {
    return this.tQuestion.is_right;
  }

  isWrong(): boolean {
    return this.selected != null && !this.tQuestion.is_right;
  }

  isUnanswered(): boolean {
    return this.selected == null;
  }

  edit() {
    console.log(`Edit: /question/${this.question.id}`);

    this.router.navigate([`/question/${this.question.id}`]);
  }
}

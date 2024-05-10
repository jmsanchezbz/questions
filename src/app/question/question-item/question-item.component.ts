import { Component, Input, NgModule } from "@angular/core";
import { Question } from "../../model/question";
import { NgIf } from "@angular/common";
import { RouterLink } from "@angular/router";
import { MatRadioModule } from "@angular/material/radio";
import { FormsModule } from "@angular/forms";
import { MatIconModule } from "@angular/material/icon";
import { MatDialog, MatDialogModule } from "@angular/material/dialog";
import { CheckIndicatorComponent } from "../../shared/components/check-indicator/check-indicator.component";
import { QuestionDlgComponent } from "../../shared/components/question-dlg/question-dlg.component";

@Component({
  selector: "app-question-item",
  templateUrl: "./question-item.component.html",
  styleUrl: "./question-item.component.scss",
  standalone: true,
  imports: [
    RouterLink,
    NgIf,
    FormsModule,
    MatRadioModule,
    MatIconModule,
    CheckIndicatorComponent,
  ],
})
export class QuestionItemComponent {
  @Input() question: Question;

  valid: Boolean = null;

  public showAnswer: boolean = false;
  selected: number = null;

  constructor(public dialog: MatDialog) {}

  openDialog() {
    const dialogRef = this.dialog.open(QuestionDlgComponent, {
      data: this.question,
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
    });
  }

  toggleShowAnswer() {
    this.showAnswer = !this.showAnswer;
  }
}

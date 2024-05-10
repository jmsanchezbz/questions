import { Component, Inject } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import {
  MAT_DIALOG_DATA,
  MatDialogRef,
  MatDialogTitle,
  MatDialogContent,
  MatDialogActions,
  MatDialogClose,
} from "@angular/material/dialog";
import { Question } from "../../../model/question";
import { MatIconModule } from "@angular/material/icon";
import { NumberToLetterPipe } from "../../pipes/number-to-letter.pipe";
import { CommonModule, UpperCasePipe } from "@angular/common";

@Component({
  selector: "app-question-dlg",
  standalone: true,
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
    MatIconModule,
    NumberToLetterPipe,
  ],
  templateUrl: "./question-dlg.component.html",
  styleUrl: "./question-dlg.component.scss",
})
export class QuestionDlgComponent {
  public explanation: string;

  constructor(
    public dialogRef: MatDialogRef<QuestionDlgComponent>,
    @Inject(MAT_DIALOG_DATA) public question: Question
  ) {
    this.explanation = question.explanation.replace(/\n/g, "<br/>");
  }

  close(): void {
    this.dialogRef.close();
  }
}

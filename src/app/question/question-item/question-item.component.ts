import { Component, Input } from "@angular/core";
import { Question } from "../../model/question";
import { NgIf } from "@angular/common";
import { RouterLink } from "@angular/router";

@Component({
    selector: "app-question-item",
    templateUrl: "./question-item.component.html",
    styleUrl: "./question-item.component.css",
    standalone: true,
    imports: [RouterLink, NgIf],
})
export class QuestionItemComponent {
  @Input() question: Question;
  public showAnswer: boolean = false;

  toggleShowAnswer() {
    this.showAnswer = !this.showAnswer;
  }
}

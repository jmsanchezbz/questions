import { Component, Input } from "@angular/core";
import { Question } from "../../model/question";

@Component({
  selector: "app-question-item",
  templateUrl: "./question-item.component.html",
  styleUrl: "./question-item.component.css",
})
export class QuestionItemComponent {
  @Input() question: Question;
  public showAnswer: boolean = false;

  toggleShowAnswer() {
    this.showAnswer = !this.showAnswer;
  }
}

import { NgIf } from "@angular/common";
import { Component, Input, OnInit } from "@angular/core";
import { MatIconModule } from "@angular/material/icon";

@Component({
  selector: "app-trial-done-indicator",
  standalone: true,
  imports: [NgIf, MatIconModule],
  templateUrl: "./trial-done-indicator.component.html",
  styleUrl: "./trial-done-indicator.component.scss",
})
export class TrialDoneIndicatorComponent implements OnInit {
  @Input() numQuestions: number = 0;
  @Input() numMistakes: number;

  public perErrors: number | null = null;

  constructor() {}

  ngOnInit(){
    let mistakes: number;

    this.perErrors = (this.numMistakes * 100) / this.numQuestions;
  }
}

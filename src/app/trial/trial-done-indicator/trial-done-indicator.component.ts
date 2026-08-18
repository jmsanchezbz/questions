
import { Component, Input, OnInit, ChangeDetectionStrategy } from "@angular/core";
import { MatIconModule } from "@angular/material/icon";

@Component({
    selector: "app-trial-done-indicator",
    imports: [MatIconModule],
    templateUrl: "./trial-done-indicator.component.html",
    changeDetection: ChangeDetectionStrategy.Eager,
    styleUrl: "./trial-done-indicator.component.scss"
})
export class TrialDoneIndicatorComponent implements OnInit {
  @Input() numQuestions: number = 1;
  @Input() numMistakes: number;
  /*
   * format: field
   * -2 - complete parenthesis ((percentage right) + shield)
   * -1 - complete (percentage right + shield)
   *  0 - basic (only shield)
   *  1 - complete (percentage wrong + shield)
   *  2 - complete parenthesis ((percentage wrong) + shield)
   */
  @Input() format: string = "0";

  public perRight: number | null = null;
  public perWrong: number | null = null;

  constructor() {}

  ngOnInit() {
    let mistakes: number;

    this.perWrong = parseFloat(
      ((this.numMistakes * 100) / this.numQuestions).toFixed(2)
    );

    this.perRight = parseFloat((100 - this.perWrong).toFixed(2));
  }

  show(): boolean {
    return this.numMistakes !== 0 || this.numQuestions == this.numMistakes;
  }
}

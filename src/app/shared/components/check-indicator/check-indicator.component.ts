import { _isNumberValue } from "@angular/cdk/coercion";
import { NgIf } from "@angular/common";
import { Component, Input, OnChanges, SimpleChanges } from "@angular/core";
import { MatIconModule } from "@angular/material/icon";

@Component({
  selector: "app-check-indicator",
  templateUrl: "./check-indicator.component.html",
  styleUrl: "./check-indicator.component.scss",
  standalone: true,
  imports: [NgIf, MatIconModule],
})
export class CheckIndicatorComponent implements OnChanges {
  @Input() option: number;
  @Input() selected: number;
  @Input() answer: number;

  show: Boolean = null;
  valid: Boolean = null;

  ngOnChanges(changes: SimpleChanges): void {
    if (changes["option"] || changes["selected"] || changes["answer"]) {
      this.updateValidity();
    }
  }

  private updateValidity() {
    this.show =
      this.answer &&
      this.selected == this.option;
    this.valid = this.option === this.selected && this.selected === this.answer;
  }
}

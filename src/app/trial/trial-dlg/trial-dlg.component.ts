import { CommonModule } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import {
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from "@angular/material/dialog";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatIconModule } from "@angular/material/icon";
import { MatInputModule } from "@angular/material/input";
import { NumberToLetterPipe } from "../../shared/pipes/number-to-letter.pipe";
import { MatSelectModule } from "@angular/material/select";

@Component({
  selector: "app-trial-dlg",
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
    MatIconModule,
    MatSelectModule,
    NumberToLetterPipe,
  ],
  templateUrl: "./trial-dlg.component.html",
  styleUrl: "./trial-dlg.component.scss",
})
export class TrialDlgComponent implements OnInit {
  public trialForm: FormGroup;
  public themes: number[] = Array(30)
    .fill(0)
    .map((_, index) => index + 1);

  constructor(
    public dialogRef: MatDialogRef<TrialDlgComponent>,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.createForm();
  }

  createForm() {
    this.trialForm = this.fb.group({
      adm: new FormControl("", [Validators.required]),
      grp: new FormControl("", [Validators.required]),
      typ: new FormControl("", [Validators.required]),
      thm: new FormControl("", [Validators.required]),
    });
  }

  onChangeType() {
    const typeControl = this.trialForm.get("typ");
    const themeControl = this.trialForm.get("thm");

    if (typeControl.value === "t") {
      themeControl.setValidators(Validators.required);
    } else {
      themeControl.clearValidators();
    }

    themeControl.updateValueAndValidity();
    console.log("onChangeType");
  }

  close(): void {
    this.dialogRef.close();
  }

  submit() {
    console.log("submit", this.trialForm.value);
  }
}

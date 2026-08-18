import { UpperCasePipe } from "@angular/common";
import { Component, OnInit, ChangeDetectionStrategy } from "@angular/core";
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
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from "@angular/material/dialog";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatIconModule } from "@angular/material/icon";
import { MatInputModule } from "@angular/material/input";import { MatSelectModule } from "@angular/material/select";
import { TrialService } from "../../services/trial.service";
import { SharedService } from "../../shared/services/shared.service";
import { HttpErrorResponse } from "@angular/common/http";
import { Router } from "@angular/router";

@Component({
    selector: "app-trial-config-dlg",
    imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatIconModule,
    MatSelectModule
],
    templateUrl: "./trial-config-dlg.component.html",
    changeDetection: ChangeDetectionStrategy.Eager,
    styleUrl: "./trial-config-dlg.component.scss"
})
export class TrialConfigDlgComponent implements OnInit {
  public trialForm: FormGroup;
  public themes: number[] = Array(30)
    .fill(0)
    .map((_, index) => index + 1);
  private message: string;
  private responseOK: boolean;
  private errorResponse: any;

  constructor(
    private router: Router,
    public dialogRef: MatDialogRef<TrialConfigDlgComponent>,
    private fb: FormBuilder,
    private trialSvc: TrialService,
    private sharedService: SharedService
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
    let config = {
      adm: this.trialForm.value.adm,
      grp: this.trialForm.value.grp,
      thm: this.trialForm.value.typ == "g" ? 0 : this.trialForm.value.thm,
      verified: 0,
    };
    let trialId: number;

    console.log("TrialDlg-submit", this.trialForm.value, config);

    this.trialSvc.generate(config).subscribe({
      next: (response) => {
        this.responseOK = true;
        console.log("Trial-config->submit", response);
        if (response) {
          this.message = "Actualización satisfactoria";
          trialId = response.id;
        }
      },
      error: (error: HttpErrorResponse) => {
        this.message = error.error.msg;
        this.errorResponse = error.error;
        this.responseOK = false;
        this.sharedService.errorLog(this.errorResponse);
        throw error;
      },
      complete: async () => {
        console.info("TrialDlg-submit->complete");

        await this.sharedService.managementToast(
          "feedback",
          this.responseOK,
          this.errorResponse
        );

        if (this.responseOK) {
          this.router.navigate([`/trial/${trialId}`]);
          this.dialogRef.close();
        }
      },
    });
  }
}

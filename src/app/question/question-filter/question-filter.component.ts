import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { QuestionFilterChange } from "../../model/question-filter-change";
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
  FormsModule,
  ReactiveFormsModule,
} from "@angular/forms";
import { debounceTime, tap } from "rxjs";
import { NgFor, NgIf, UpperCasePipe } from "@angular/common";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatSelectModule } from "@angular/material/select";

@Component({
  selector: "app-question-filter",
  templateUrl: "./question-filter.component.html",
  styleUrl: "./question-filter.component.scss",
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    NgFor,
    NgIf,
    UpperCasePipe,
    MatFormFieldModule,
    MatSelectModule,
  ],
})
export class QuestionFilterComponent implements OnInit {
  private readonly QTYPE = "q";

  public filterForm: FormGroup;
  public hideTheme: boolean;

  @Input() filter: QuestionFilterChange;
  @Input() themes: number[];
  @Input() groups: string[];
  @Input({ required: false }) type: string = "q";
  @Output() private filterChanged: EventEmitter<QuestionFilterChange>;

  constructor(private fb: FormBuilder) {
    this.filterChanged = new EventEmitter<QuestionFilterChange>();
  }

  ngOnInit() {
    this.createForm();

    this.hideTheme = this.type.includes(this.QTYPE);

    this.filterForm.valueChanges
      .pipe(
        debounceTime(500),
        tap((response) => {
          console.log("Filter-change", response);
        })
      )
      .subscribe(() => {
        this.onSubmit();
      });
  }

  private createForm(): void {
    this.filterForm = this.fb.group({
      adm: new FormControl(this.filter?.adm, [Validators.required]),
      grp: new FormControl(this.filter?.grp, [Validators.required]),
      thm: new FormControl(this.filter?.thm, []),
      verified: new FormControl(this.filter?.verified, []),
    });
  }

  private onSubmit(): void {
    this.filter = this.filterForm.value;
    console.log("submit", this.filter);

    this.filterChanged.emit(this.filter);
  }
}

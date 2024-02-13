import { Component, EventEmitter, Input, Output } from '@angular/core';
import { QuestionFilterChange } from '../../model/question-filter-change';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { debounceTime, tap } from 'rxjs';

@Component({
  selector: 'app-question-filter',
  templateUrl: './question-filter.component.html',
  styleUrl: './question-filter.component.css'
})
export class QuestionFilterComponent {
  public filterForm: FormGroup;

  @Input() filter: QuestionFilterChange;
  @Input() themes: number[];
  @Input() groups: string[];
  @Output() private filterChanged: EventEmitter<QuestionFilterChange>;

  constructor(private fb: FormBuilder) {    
    this.filterChanged = new EventEmitter<QuestionFilterChange>();
  }

  ngOnInit() {
    this.createForm();

    this.filterForm.valueChanges.pipe(
      debounceTime(500),
      tap((response)=>{console.log('Filter-change',response)})
    ).subscribe(()=>{
      this.onSubmit();
    })
  }

  createForm() {
    this.filterForm = this.fb.group({
      adm: new FormControl(this.filter?.adm, [Validators.required]),
      grp: new FormControl(this.filter?.grp, [Validators.required]),
      thm: new FormControl(this.filter?.thm, []),
      verified: new FormControl(this.filter?.verified, [])
    })
  }

  onSubmit() {
    this.filter = this.filterForm.value;
    console.log('submit',this.filter);
    
    this.filterChanged.emit(this.filter);
  }
}

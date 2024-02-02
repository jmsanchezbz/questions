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
    this.createForm();
    this.filterChanged = new EventEmitter<QuestionFilterChange>();
    
    this.filterForm.valueChanges.pipe(
      debounceTime(500),
      tap((response)=>{console.log('Filter-change',response)})
    ).subscribe(()=>{
      this.onSubmit();
    })
  }

  createForm() {
    this.filterForm = this.fb.group({
      adm: new FormControl('caib', [Validators.required]),
      grp: new FormControl('a1', [Validators.required]),
      thm: new FormControl(1, []),
      verified: new FormControl(null, [])
    })
  }

  onSubmit() {
    this.filterChanged.emit(this.filterForm.value);
  }
}

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
  readonly FILTER_CHANGE: string = 'filter-change';

  @Input() filter: QuestionFilterChange = {adm:'caib',grp:'a1',thm:1, verified:null};
  @Input() themes: number[];
  @Input() groups: string[];
  @Output() private filterChanged: EventEmitter<QuestionFilterChange>;

  constructor(private fb: FormBuilder) {
    this.loadInitialFilter()
    this.createForm(this.filter);
    this.filterChanged = new EventEmitter<QuestionFilterChange>();

    this.filterForm.valueChanges.pipe(
      debounceTime(500),
      tap((response)=>{console.log('Filter-change',response)})
    ).subscribe(()=>{
      this.onSubmit();
    })
  }

  loadInitialFilter() {
    const item = localStorage.getItem(this.FILTER_CHANGE)

    if(item !== null) {
      this.filter = JSON.parse(item);
    }
  }

  createForm(filter: QuestionFilterChange) {
    this.filterForm = this.fb.group({
      adm: new FormControl(filter.adm, [Validators.required]),
      grp: new FormControl(filter.grp, [Validators.required]),
      thm: new FormControl(filter.thm, []),
      verified: new FormControl(filter.verified, [])
    })
  }

  onSubmit() {
    localStorage.setItem(this.FILTER_CHANGE, JSON.stringify(this.filter));console.log(this.filter);
    
    this.filter = this.filterForm.value;
    this.filterChanged.emit(this.filter);
  }
}

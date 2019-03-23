import { Component, OnInit, EventEmitter, Output, Input, SimpleChanges, OnChanges } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-size-unit',
  templateUrl: './size-unit.component.html'
})
export class SizeUnitComponent implements OnInit, OnChanges {
  public sizeUnitForm: FormGroup;
  public sizeUnit: string = 'px';

  @Input()
  public size: string;

  @Output()
  public sizeChanged: EventEmitter<string> = new EventEmitter<string>();

  constructor() {
    this.sizeUnitForm = new FormGroup({
      sizeValue: new FormControl('')
    });
  }

  public ngOnInit(): void {


    console.log(this.sizeUnitForm);

    this.sizeUnitForm.valueChanges.subscribe((formValues: any) => {
      this.sizeChanged.next(formValues.sizeValue);
    });
  }

  public ngOnChanges(changes: SimpleChanges): void {
    console.log(this.sizeUnitForm);
    if (changes && changes.size && this.sizeUnitForm) {
      this.sizeUnitForm.patchValue({
        sizeValue: changes.size.currentValue
      }, {
        emitEvent: false
      });
    }
  }
}

import { Component, OnInit, Output, EventEmitter, Input, SimpleChanges, OnChanges } from "@angular/core";

import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-color-picker',
  templateUrl: './color-picker.component.html'
})
export class ColorPickerComponent implements OnInit, OnChanges {
  public colorPickerForm: FormGroup;

  constructor() {
    this.colorPickerForm = new FormGroup({
      colorPicker: new FormControl('')
    });
  }

  @Input()
  public color: string;

  @Output()
  public colorChanged: EventEmitter<string> = new EventEmitter<string>();

  public ngOnInit(): void {
    this.colorPickerForm.valueChanges.subscribe((formValues: any) => {
      this.colorChanged.next(formValues.colorPicker);
    });
  }

  public ngOnChanges(changes: SimpleChanges): void {
    console.log(changes, this.colorPickerForm);
    if (changes && changes.color && this.colorPickerForm) {
      this.colorPickerForm.patchValue({
        colorPicker: changes.color.currentValue
      }, {
        emitEvent: false
      });
    }
  }
}

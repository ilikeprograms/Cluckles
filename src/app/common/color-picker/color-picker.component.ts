import { Component, OnInit, Output, EventEmitter } from "@angular/core";

import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-color-picker',
  templateUrl: './color-picker.component.html'
})
export class ColorPickerComponent implements OnInit {
  public colorPickerForm: FormGroup;

  @Output()
  public colorChanged: EventEmitter<string> = new EventEmitter<string>();

  public ngOnInit(): void {
    this.colorPickerForm = new FormGroup({
      colorPicker: new FormControl('')
    });

    this.colorPickerForm.valueChanges.subscribe((formValues: any) => {
      this.colorChanged.next('#' + formValues.colorPicker);
    });
  }
}

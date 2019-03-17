import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-size-unit',
  templateUrl: './size-unit.component.html'
})
export class SizeUnitComponent implements OnInit {
  public sizeUnitForm: FormGroup;
  public sizeUnit: string = 'px';

  @Output()
  public sizeChanged: EventEmitter<string> = new EventEmitter<string>();

  public ngOnInit(): void {
    this.sizeUnitForm = new FormGroup({
      sizeValue: new FormControl('')
    });

    this.sizeUnitForm.valueChanges.subscribe((formValues: any) => {
      this.sizeChanged.next(formValues.sizeValue + this.sizeUnit);
    });
  }
}

import {
  Component,
  OnInit,
  EventEmitter,
  Output,
  Input,
  SimpleChanges,
  OnChanges
} from "@angular/core";
import { FormGroup, FormControl } from "@angular/forms";
import { ISizeType } from "src/app/ngrx/bootstrap/variables.interface";
import { ISizeOutput } from "./size-output.interface";

@Component({
  selector: "app-size-unit",
  templateUrl: "./size-unit.component.html",
  styleUrls: ["./size-unit.component.scss"]
})
export class SizeUnitComponent implements OnInit, OnChanges {
  public sizeUnitForm: FormGroup;
  public sizeUnit: string = "px";

  @Input()
  public size: string;

  @Input()
  public unit: string;

  @Input()
  public label: string = "";

  @Output()
  public valueChanged: EventEmitter<ISizeOutput> = new EventEmitter<
    ISizeOutput
  >();

  constructor() {
    this.sizeUnitForm = new FormGroup({
      sizeValue: new FormControl(""),
      unit: new FormControl("")
    });
  }

  public ngOnInit(): void {
    this.sizeUnitForm.valueChanges.subscribe(
      (formValues: { sizeValue: string; unit: string }) => {
        this.valueChanged.next({
          value: formValues.sizeValue,
          unit: formValues.unit
        });
      }
    );
  }

  public ngOnChanges(changes: SimpleChanges): void {
    if (changes && changes.size && this.sizeUnitForm) {
      this.sizeUnitForm.patchValue(
        {
          sizeValue: changes.size.currentValue
        },
        {
          emitEvent: false
        }
      );
    }

    if (changes && changes.unit && this.sizeUnitForm) {
      this.sizeUnitForm.patchValue(
        {
          unit: changes.unit.currentValue
        },
        {
          emitEvent: false
        }
      );
    }
  }
}

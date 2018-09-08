/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { BootsrapComponentAlertComponent } from './bootsrap-component-alert.component';

describe('BootsrapComponentAlertComponent', () => {
  let component: BootsrapComponentAlertComponent;
  let fixture: ComponentFixture<BootsrapComponentAlertComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BootsrapComponentAlertComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BootsrapComponentAlertComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { AbstractControl } from '@angular/forms';

@Component({
  selector: 'app-validation-message',
  templateUrl: './validation-message.component.html',
  styleUrls: ['./validation-message.component.css']
})
export class ValidationMessageComponent implements OnInit {

  @Input() control: AbstractControl<any, any>;

  constructor() { }

  ngOnInit(): void {
  }

  hasError(errorName:string){
    return this.control.errors ? this.control.errors[errorName] : null
  }
}

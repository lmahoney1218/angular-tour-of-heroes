import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormControlDirective, FormGroup, FormGroupDirective } from '@angular/forms';

@Component({
  selector: 'first-name',
  templateUrl: './first-name.component.html',
  styleUrls: ['./first-name.component.css']
})

export class FirstNameComponent implements OnInit {
  @Input() parentForm!: FormGroup;

  constructor() { }

  ngOnInit(): void {
  }

}

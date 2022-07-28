import { Component, Input, OnInit } from '@angular/core';
import { FormArray, FormGroup, FormBuilder} from '@angular/forms';

@Component({
  selector: 'phone-numbers-list',
  templateUrl: './phone-numbers-list.component.html',
  styleUrls: ['./phone-numbers-list.component.css']
})

export class PhoneNumbersListComponent implements OnInit {
  
  @Input() parentForm!: FormGroup;

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    console.log(this.parentForm.controls['phoneNumbers'].value)
    console.log(this.parentForm.controls['phoneNumbers'])
    console.log(this.parentPhoneNumbersArray)
  }

  parentPhoneNumbersArray(): FormArray { 
   return this.parentForm.get("phoneNumbers") as FormArray
  }

  addFormControl(): void {
    this.parentPhoneNumbersArray().push(this.fb.group({
      number: ['']
    }))
  }

  removeNumber(index: number) {
    this.parentPhoneNumbersArray().removeAt(index)
  }

  //delete all phone numbers
  clearPhoneNumbers() {
    this.parentPhoneNumbersArray().clear()
  }

}

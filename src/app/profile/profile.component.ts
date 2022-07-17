import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormArray, Validators } from '@angular/forms';
import { customEmailValidator } from './validators/email.validator';
import { Profile } from './profile.model';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})

export class ProfileComponent implements OnInit {

  // Data 
  profile:Profile = {
    "firstName": "Laura",
    "lastName": "Mahoney",
    "email": "laura@test.com",
    // "phoneNumbers": [
    //     {
    //         "number": "111-111-1111"
    //     },
    //     {
    //         "number": "222-222-2222",
    //     }
    // ]
  }

  profileForm!: FormGroup;

  firstName = new FormControl('', Validators.required);
  lastName = new FormControl('', Validators.required);
  email = new FormControl('', [ Validators.required, customEmailValidator() ])

  testArray!: FormArray;
 
  constructor() { }

  getFormControl(index: number): FormControl{
    return this.testArray.controls[index] as FormControl;
  }
  
  showArrayValues() {
    console.log(this.testArray.value)
  }

  addFormControl() {
    this.testArray.push(new FormControl(''))
  }

  ngOnInit(): void {
    this.profileForm = new FormGroup({
      firstName: this.firstName,
      lastName: this.lastName,
      email: this.email
    });

    this.testArray = new FormArray([new FormControl(''), new FormControl('')]);

    this.patchProfileForm();

  } 

  patchProfileForm() {
    this.profileForm.patchValue(this.profile)
  }

  onSubmit(formValues:Profile) {
    console.log(formValues)
  }

  emailError() {
    if(this.email.getError('invalidEmail') && this.email.dirty) {
      return true;
    }
    return null;

  }

}

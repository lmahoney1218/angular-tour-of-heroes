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
  profile: Profile = {
    "firstName": "Laura",
    "lastName": "Mahoney",
    "email": "laura@test.com",
    "phoneNumbers": [
        {
            "number": "111-111-1111"
        },
        {
            "number": "222-222-2222",
        }
    ]
  }

  profileForm!: FormGroup;

  firstName = new FormControl('', Validators.required);
  lastName = new FormControl('', Validators.required);
  email = new FormControl('', [ Validators.required, customEmailValidator() ]);

  constructor() { }

  ngOnInit(): void {
    this.profileForm = new FormGroup({
      firstName: this.firstName,
      lastName: this.lastName,
      email: this.email,
      phoneNumbers: new FormArray([
        this.addPhoneNumbersFormGroup()
      ])
    });

    this.patchProfileForm();
    this.patchPhoneNumbers();
  } 

  get phoneNumbers(): FormArray {
    return this.profileForm.get('phoneNumbers') as FormArray;
  }

  addPhoneNumbersFormGroup() {
    return new FormGroup({
      number: new FormControl('')
    });
  }

  addFormControl(): void {
    this.phoneNumbers.push(this.addPhoneNumbersFormGroup())
  }

  patchProfileForm() {
    this.profileForm.patchValue(this.profile)
  }
  
  patchPhoneNumbers() {
    // this.phoneNumbers.patchValue([
    //   {number: '000-000-000'}
    // ])
    let phoneNumbers= {
      number: "000-000-000"
    };
    this.profileForm.get('phoneNumbers')?.patchValue([phoneNumbers])
  }

  onSubmit(formValues: Profile) {
    console.log(formValues)
  }

  emailError() {
    if(this.email.getError('invalidEmail') && this.email.dirty) {
      return true;
    }
    return null;

  }

}

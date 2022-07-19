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

    //this.patchProfileForm();
    //this.patchPhoneNumbers();
    //this.loopPhoneNumberData();
   // this.loopPhoneNumberArray();
  } 

  //getter method to read the value of the phone numbers array
  get PhoneNumbersArray(): FormArray {
    return this.profileForm.get('phoneNumbers') as FormArray;
  }

  //sets the FormGroup for the phoneNumbers Array
  addPhoneNumbersFormGroup() {
    return new FormGroup({
      number: new FormControl('')
    });
  }

  //called on click in the template - pushes a new FormGroup to the FormArray
  addFormControl(): void {
    this.PhoneNumbersArray.push(this.addPhoneNumbersFormGroup())
  }

  //patches the whole form
  patchProfileForm() {
    this.profileForm.patchValue(this.profile)
  }
  
  //Patches just the phone numbers
  patchPhoneNumbers() {
    this.profileForm.get('phoneNumbers')?.patchValue(this.profile.phoneNumbers)
  }

  //Loops through the profile data phone numbers
  loopPhoneNumberData() {

    for (let i = 0; i < this.profile.phoneNumbers.length; i++) {
      let eachValue = this.profile.phoneNumbers[i]
      console.log(eachValue)
      
    }
  }

  //Loops through the PhoneNumbersArray
  loopPhoneNumberArray() {
    console.log(this.PhoneNumbersArray.length)

    for (let i = 0; i < this.PhoneNumbersArray.length; i++) {
      let arrayValue = this.PhoneNumbersArray.at(i).get('number') as FormGroup

      console.log(arrayValue)
    }
  }

  //on submit actions
  onSubmit(formValues: Profile) {
    console.log(formValues)
  }

  //Email validation
  emailError() {
    if(this.email.getError('invalidEmail') && this.email.dirty) {
      return true;
    }
    return null;

  }

}

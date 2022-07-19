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
    this.patchPhoneNumbers();
    //this.loopPhoneNumberData();
   // this.loopPhoneNumberArray();
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
    // let phoneNumbers= {
    //   number: "000-000-000"
    // };
    // this.profileForm.get('phoneNumbers')?.patchValue([phoneNumbers])

  // this.profileForm.get('phoneNumbers')?.patchValue(this.profile.phoneNumbers)

    //this.phoneNumbers.push(this.loopPhoneNumberData())
  }

  loopPhoneNumberData() {
    
    // let getIndex = this.phoneNumbers.at(1).value

    // let getLength = this.phoneNumbers.length


    // for (let i = 0; i < this.phoneNumbers.length; i++) {
    //   let eachValue = this.phoneNumbers.at(i)

    //   //eachValue.patchValue(this.profile)
    //   console.log(eachValue)
    // }

    for (let i = 0; i < this.profile.phoneNumbers.length; i++) {
      let eachValue = this.profile.phoneNumbers[i]
      console.log(eachValue)
      
    }

  }

  loopPhoneNumberArray() {
    
    // let getIndex = this.phoneNumbers.at(1).value

    // let getLength = this.phoneNumbers.length
 console.log(this.phoneNumbers.length)
    let arrayValue

    for (let i = 0; i < this.phoneNumbers.length; i++) {
      arrayValue = this.phoneNumbers.at(i).get('number') as FormGroup
//arrayValue.push(this.loopPhoneNumberData)
      //eachValue.patchValue(this.profile)
      
      console.log(arrayValue)
       this.phoneNumbers.push(arrayValue);

     console.log(arrayValue)
    }
    return arrayValue;
   // this.profileForm.patchValue(this.loopPhoneNumberData);
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

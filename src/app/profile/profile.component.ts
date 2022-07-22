import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormArray, Validators } from '@angular/forms';
import { customEmailValidator } from './validators/email.validator';

import { Profile } from './profile.model';
import { ProfileService } from '../profile.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})

export class ProfileComponent implements OnInit {

  profiles: any;

  profileForm!: FormGroup;

  firstName = new FormControl('', Validators.required);
  lastName = new FormControl('', Validators.required);
  email = new FormControl('', [ Validators.required, customEmailValidator() ]);

  constructor(private profileService: ProfileService) { }

  getProfileData(): void {
    this.profileService.getProfile().subscribe(profiles => this.profiles = profiles);
  }

  ngOnInit(): void {
    this.getProfileData();

    this.profileForm = new FormGroup({
      firstName: this.firstName,
      lastName: this.lastName,
      email: this.email,
      phoneNumbers: new FormArray([])
    });

    this.populatePhoneFieldsBasedOnData();
    this.patchProfileForm();
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

  //
  removeNumber(index: number) {
    this.PhoneNumbersArray.removeAt(index)
  }

  //patches the whole form
  patchProfileForm() {
    this.profileForm.patchValue(this.profiles)
  }
  
  //loops through data and prepopulates phone number fields accordingly
  populatePhoneFieldsBasedOnData() {
    this.profiles.phoneNumbers.forEach((item:any) => {
      const newFormGroup = this.addPhoneNumbersFormGroup();

      newFormGroup.patchValue(item)

      this.PhoneNumbersArray.push(newFormGroup);
    })
  }

  //reset phone numbers
  clearPhoneNumbers() {
     // this.PhoneNumbersArray.reset()
      this.PhoneNumbersArray.clear()
    }

  //Reset Form
  clearForm() {
   this.profileForm.reset();
   //this.profileForm.patchValue(this.blankForm)   
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

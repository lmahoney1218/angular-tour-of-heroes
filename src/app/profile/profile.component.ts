import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, FormArray, Validators, AbstractControl } from '@angular/forms';
import { customEmailValidator } from './validators/email.validator';

import { Profile } from './profile.model';
import { PhoneNumber } from './profile.model';
import { ProfileService } from '../profile.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})

export class ProfileComponent implements OnInit {

  profiles!: Profile;

  profileForm = this.fb.group({
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    email: ['', [Validators.required, customEmailValidator()] ],
    phoneNumbers: this.fb.array([])
  });

  constructor(
    private fb: FormBuilder, 
    private profileService: ProfileService
  ) { }

  getProfileData(): void {
    this.profileService.getProfile().subscribe(profiles => this.profiles = profiles);
  }

  ngOnInit(): void {
    this.getProfileData();

    this.populatePhoneFieldsBasedOnData();
    this.patchProfileForm();
  } 

  //getter method to read the value of the phone numbers array
  get PhoneNumbersArray(): FormArray {
    return this.profileForm.get('phoneNumbers') as FormArray;
  }

  //sets the FormGroup for the phoneNumbers Array
  addPhoneNumbersFormGroup() {
    return this.fb.group({
      number: ['']
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
    this.profiles.phoneNumbers.forEach((item: PhoneNumber) => {
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
  onSubmit() {
    console.log(this.profileForm.value)
  }

  //Helper Function - Errors
  controlHasError(controlName: string, errorType: string){ 
    const control = this.profileForm.get(controlName); 
    return control?.getError(errorType) && control.dirty; 
  }

}

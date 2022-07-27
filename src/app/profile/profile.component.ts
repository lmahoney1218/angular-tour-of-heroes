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
 //profileForm!: FormGroup;

  profileForm = this.fb.group({
    firstName: [''],
    lastName: ['', Validators.required],
    email: ['', [Validators.required, customEmailValidator()] ],
    phoneNumbers: this.fb.array([])
  });

  constructor(
    private fb: FormBuilder, 
    private profileService: ProfileService
  ) { }

  ngOnInit(): void {    
    this.getProfileData();
    this.patchProfileForm();

    console.log(this.profileForm.controls['phoneNumbers'].value)
    console.log(this.profiles.phoneNumbers)

  } 

  private getProfileData(): void {
    this.profileService.getProfile().subscribe(profiles => this.profiles = profiles);
  }

  //patches the whole form
  private patchProfileForm() {
    this.profileForm.patchValue(this.profiles)
  }
  
  //Reset Form
  resetForm() {
   this.profileForm.reset();
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

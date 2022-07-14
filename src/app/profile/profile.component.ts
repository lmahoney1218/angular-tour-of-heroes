import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { customEmailValidator } from './validators/email.validator';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})

export class ProfileComponent implements OnInit {

  // Data model
  profile = {
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

  constructor() { }

  ngOnInit(): void {
   //this.patchProfileForm();

    this.profileForm = new FormGroup({
      firstName: new FormControl('', Validators.required),
      lastName: new FormControl('', Validators.required),
      email: new FormControl('', [ Validators.required, customEmailValidator() ])
    });
  } 

  patchProfileForm() {
    //connecting profile data to the form
    this.profileForm.patchValue(this.profile)
  }

  onSubmit() {
    console.log(this.profileForm.value)
  }

}

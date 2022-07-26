import { Component, Input, OnInit } from '@angular/core';
import { FormArray, FormGroup, FormBuilder} from '@angular/forms';

import { ProfileService } from 'src/app/profile.service';
import { Profile } from '../profile.model';
import { PhoneNumber } from '../profile.model';

@Component({
  selector: 'phone-numbers-list',
  templateUrl: './phone-numbers-list.component.html',
  styleUrls: ['./phone-numbers-list.component.css']
})
export class PhoneNumbersListComponent implements OnInit {
  
  @Input() parentForm!: FormGroup;

  profiles!: Profile;

  constructor(
    private fb: FormBuilder,
    private profileService: ProfileService
  ) { }

  ngOnInit(): void {
    this.getProfileData();

    this.populatePhoneFieldsBasedOnData();
  }

  private getProfileData(): void {
    this.profileService.getProfile().subscribe(profiles => this.profiles = profiles);
  }

  get PhoneNumbersArray(): FormArray {
    return this.parentForm.get('phoneNumbers') as FormArray;
  }

  //loops through data and prepopulates phone number fields accordingly
  private populatePhoneFieldsBasedOnData() {
    this.profiles.phoneNumbers.forEach((item: PhoneNumber) => {
      const newFormGroup = this.addPhoneNumbersFormGroup();

      newFormGroup.patchValue(item)

      this.PhoneNumbersArray.push(newFormGroup);
    })
  }

  //sets the FormGroup for the phoneNumbers Array
  private addPhoneNumbersFormGroup() {
    return this.fb.group({
      number: ['']
    });
  }

  addFormControl(): void {
    this.PhoneNumbersArray.push(this.addPhoneNumbersFormGroup())
  }

  removeNumber(index: number) {
    this.PhoneNumbersArray.removeAt(index)
  }

  //delete all phone numbers
  clearPhoneNumbers() {
    this.PhoneNumbersArray.clear()
  }

}

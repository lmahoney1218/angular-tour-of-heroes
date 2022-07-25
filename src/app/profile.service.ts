import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import data from './mock-profile.json';
import { Profile } from './profile/profile.model';
import { PhoneNumber } from './profile/profile.model';

@Injectable({
  providedIn: 'root'
})

export class ProfileService {

  constructor() { }

  getProfile(): Observable<Profile> {
    const profileData = of(data)
    return profileData;
  }
}

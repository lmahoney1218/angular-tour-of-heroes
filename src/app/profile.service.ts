import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import data from './mock-profile.json';

@Injectable({
  providedIn: 'root'
})

export class ProfileService {

  constructor() { }

  getProfile(): Observable<any> {
    const profileData = of(data)
    return profileData;
  }
}

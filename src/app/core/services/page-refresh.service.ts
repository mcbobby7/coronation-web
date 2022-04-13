import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PageRefreshService {
  public isUserLoggedIn = false;
  constructor() { }
}

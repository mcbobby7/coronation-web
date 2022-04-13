import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor() { }

  isLoggedIn = JSON.parse(localStorage.getItem('isLoggedIn' || 'false'));
  userInfo = null

  setLogedin(value: boolean) {
    // this.isLogedIn = value;
    localStorage.setItem('isLoggedIn', 'true');
  }
  setUser(user) {
    this.userInfo = user
    console.log(this.userInfo);

  }
  getUser(){
    console.log(this.userInfo);
    return this.userInfo
  }

  setLogedout(value: boolean) {
    // this.isLogedIn = value;
    localStorage.setItem('isLoggedIn', 'false');
  }

  get loggedIn() {
    return JSON.parse(localStorage.getItem('isLoggedIn' || this.isLoggedIn.toString()))
  }
}

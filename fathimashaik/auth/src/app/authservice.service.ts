import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router} from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class AuthserviceService {

  private _registerUrl = "http://localhost:5000/api/register";
  private _loginUrl = "http://localhost:5000/api/login";
  constructor(private http :HttpClient, private _router: Router) { }

  registerUser(user){
    return this.http.post<any>(this._registerUrl, user)
  }
  loginUser(user){
    return this.http.post<any>(this._loginUrl, user)
  }
  loggedIn(){
    return !!localStorage.getItem('token')
  }
  logoutUser(){
    this._router.navigate(['/events'])
    // return !!localStorage.removeItem('token')
     return localStorage.removeItem('token')

  }
  getToken(){
    return localStorage.getItem('token')
  }
}


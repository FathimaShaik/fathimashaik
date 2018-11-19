import { Injectable } from '@angular/core';
import { CanActivate} from '@angular/router';
import { Router} from '@angular/router'
import { AuthserviceService } from './authservice.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private _authserviceService: AuthserviceService,
              private _router: Router){}
  canActivate():boolean{
    if(this._authserviceService.loggedIn()){
      return true;
    } else {
      this._router.navigate(['/login'])
      return false
    }

  }
   
  }


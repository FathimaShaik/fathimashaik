import { Component, OnInit } from '@angular/core';
import { AuthserviceService } from '../authservice.service';
import { Router } from '@angular/router'
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginUserData = {}
  public error;
  constructor(private _auth: AuthserviceService, private _router: Router) { }

  ngOnInit() {
  }

  loginUser() {
    // console.log(JSON.stringify(this.loginUserData))
    this._auth.loginUser(this.loginUserData)
      .subscribe(
        res => {
          console.log(res)
          localStorage.setItem('token', res.token)
          this._router.navigate(['/special'])
        },
        err => console.log(err.error)

      )
    // console.log(this.loginUserData)
  }
}

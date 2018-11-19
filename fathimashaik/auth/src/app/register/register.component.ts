import { Component, OnInit } from '@angular/core';
import { AuthserviceService } from '../authservice.service';
import { Router} from '@angular/router'
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerUserData = {}
  constructor(private _authservice: AuthserviceService,private _router: Router) { }

  ngOnInit() {
  }
  registerUser() {

    console.log(JSON.stringify(this.registerUserData))
      this._authservice.registerUser(this.registerUserData)
      .subscribe(
        res => 
        {
          console.log(res)
          localStorage.setItem('token', res.token)
          this._router.navigate(['/events'])
        },
        err => console.log(err)
    )
  }
}

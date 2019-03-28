import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginUserData = {}
  constructor(private _auth: AuthService,
              private _router: Router ) { }

  ngOnInit() {
  }

  loginUser() {
    // console.log(this.loginUserData)
    this._auth.loginUser(this.loginUserData)
      .subscribe(
        res => {
          console.log(res)
          localStorage.setItem('token', res.token) // Sets key as 'token' and value as res.token from serv to browsers local storage
          this._router.navigate(['']) // Redirection link on succesfull authentication
        },
        err => console.log(err)
      )
  }

}

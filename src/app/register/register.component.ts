import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'; // Used for redirection on succesfull authentiction
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  registerUserData =  {}
  constructor(private _auth: AuthService,
              private _router: Router ) { }

  ngOnInit() {
  }

  registerUser() {
    //console.log(this.registerUserData)
    this._auth.registerUser(this.registerUserData)
      .subscribe(
        res => {
          console.log(res)
          localStorage.setItem('token', res.token) // Sets key as 'token' and value as res.token from serv to browsers local storage
          this._router.navigate(['']) // The redirected link on succesfull registration
        },
        err => console.log(err)
      )
  }

}

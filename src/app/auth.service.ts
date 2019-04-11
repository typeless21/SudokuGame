import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private _registerUrl = "http://localhost:3000/api/register";
  private _loginUrl = "http://localhost:3000/api/login";
  private _gameUrl = "http://localhost:3000/api/play";
  constructor(private http: HttpClient,
              private _router: Router) { }

  registerUser(user) {
      return this.http.post<any>(this._registerUrl, user)
  }

  loginUser(user) {
      return this.http.post<any>(this._loginUrl, user) // <Any> so observable can be returned without errors
  }

  loggedIn() {
    return !!localStorage.getItem('token') // Double negate
                                           // Returns either true or false on token existing
  }

  logoutUser() {
      localStorage.removeItem('token')
      this._router.navigate([''])
  }

  getToken(){
    return localStorage.getItem('token')
  }

  setDiff(diff){
      return this.http.post<any>(this._gameUrl, diff)
  }

  private messageSource = new BehaviorSubject('default message');
  currentMessage = this.messageSource.asObservable();

  changeMessage(message: string) {
    this.messageSource.next(message)
  }


}

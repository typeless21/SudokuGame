import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class AboutService {

  private _aboutUrl = "http://localhost:3000/api/about";
  constructor(private http: HttpClient) { }

  getAbout(){
    return this.http.get<any>(this._aboutUrl)
  }
}

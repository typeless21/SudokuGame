import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-difficulty',
  templateUrl: './difficulty.component.html',
  styleUrls: ['./difficulty.component.scss']
})
export class DifficultyComponent implements OnInit {

  diffData = <any> {}
  message:string;

  constructor(private _auth: AuthService,
              private _router: Router) { }

  ngOnInit() {
    this._auth.currentMessage.subscribe(message => this.message = message)
  }
  
  changeDiff(diff) {
    this._auth.changeMessage(diff)
    this._router.navigate(['/board'])
  }


}

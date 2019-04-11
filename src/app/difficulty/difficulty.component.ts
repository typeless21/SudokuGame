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
  diff:string;
  continue: boolean;

  constructor(private _auth: AuthService,
              private _router: Router) { }

  ngOnInit() {
    this._auth.currentDiff.subscribe(diff => this.diff = diff)
    this._auth.currentCon.subscribe(con => this.continue = con)
  }

  changeDiff(diff) {
    this._auth.changeDiff(diff)
    this._auth.changeCon(false)
    console.log(this.continue)
    this._router.navigate(['/board'])
  }


}

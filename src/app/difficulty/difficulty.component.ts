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

  constructor(private _auth: AuthService,
              private _router: Router) { }

  ngOnInit() {
    this._auth.currentDiff.subscribe(diff => this.diff = diff)
    console.log(this.diff)
  }

  changeDiff(diff) {
    this._auth.changeDiff(diff)
    this._router.navigate(['/board'])
  }


}

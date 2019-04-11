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
  constructor(private _auth: AuthService,
              private _router: Router ) { }

  ngOnInit() {
  }

  setDiff(diff) {
    this.diffData.diff = diff
    this._auth.setDiff(this.diffData)
      .subscribe(
        res => {
          console.log(res)
          this._router.navigate(['']) // Change later
        },
        err => console.log(err)
      )
  }

}

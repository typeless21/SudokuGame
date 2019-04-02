import { Component, OnInit, AfterViewInit } from '@angular/core';
import { AboutService } from '../about.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit {

  userid: any;
  data = []
  constructor(private _aboutService: AboutService,
              private _router: Router) { }

  ngOnInit() {
    this._aboutService.getAbout()
      .subscribe(
        res => this.userid = res,
        err => {
          if (err instanceof HttpErrorResponse){
            if (err.status === 401) {
                this._router.navigate(['/login'])
            }
          }
        }
      )

  }

  ngAfterviewInit(){
    console.log(this.userid);
  }

}

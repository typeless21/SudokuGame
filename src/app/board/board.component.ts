import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent implements OnInit {
  numbers: number[];
  constructor() {
    this.numbers = Array(81).fill(0).map((x,i)=>i); // [0,1,2,3,4]
  }

  ngOnInit() {
  }

}

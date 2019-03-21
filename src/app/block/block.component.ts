import { Component, OnInit, OnChanges, Input } from '@angular/core';

@Component({
  selector: 'app-block',
  templateUrl: './block.component.html',
  styleUrls: ['./block.component.scss']
})
export class BlockComponent implements OnInit {

  @Input() value: string;
  isNumber: boolean;
  @Input() row: number;
  @Input() col: number;
  @Input() square: number;

  onChange(target: any): void {
    this.value = target.value;
    if (this.value.match(/\b[1-9]\b|$^/g)){
      target.style.cssText="border-color: grey;";
      this.isNumber = true;
    }
    else{
      target.style.cssText="border-color: red;";
      this.isNumber = false;
    }
  }

  constructor() {
  }

  getValue(){
    return this.value;
  }

  ngOnInit() {
    this.row = +this.row;
    if (this.row / 3 < 1 && this.col / 3 < 1){
      this.square = 0;
    }
    else if (this.row / 3 < 1 && this.col / 3 < 2){
      this.square = 1;
    }
    else if (this.row / 3 < 1 && this.col / 3 < 3){
      this.square = 2;
    }
    else if (this.row / 3 < 2 && this.col / 3 < 1){
      this.square = 3;
    }
    else if (this.row / 3 < 2 && this.col / 3 < 2){
      this.square = 4;
    }
    else if (this.row / 3 < 2 && this.col / 3 < 3){
      this.square = 5;
    }
    else if (this.row / 3 < 3 && this.col / 3 < 1){
      this.square = 6;
    }
    else if (this.row / 3 < 3 && this.col / 3 < 2){
      this.square = 7;
    }
    else if (this.row / 3 < 3 && this.col / 3 < 3){
      this.square = 8;
    }
    this.value = ""+this.row + ""+this.col + ""+this.square;
    if (this.value != null){
      if (this.value.toString().match(/\b[1-9]\b|$^/g)){
        this.isNumber = true;
      }
      else{
        this.isNumber = false;
      }
    }

  }

}

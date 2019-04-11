import { Component, OnInit, OnChanges, Input, ViewChild} from '@angular/core';

@Component({
  selector: 'app-block',
  templateUrl: './block.component.html',
  styleUrls: ['./block.component.scss']
})


export class BlockComponent implements OnInit {

  @Input() value: string;
  isNumber: boolean = false;
  @Input() row: number;
  @Input() col: number;
  @Input() square: number;
  @ViewChild('block') block;
  isGiven: boolean;

  onChange(target: any): void {
    this.value = target.value;
    if (this.value.match(/\b[1-9]\b|$^/g)){
      if (this.square % 2 == 0){
        this.block.nativeElement.style.cssText="border-color: grey; background-color: lightgrey; text-align: center;";
      }
      else {
        this.block.nativeElement.style.cssText="border-color: grey; background-color: rgb(235,235,228); text-align: center;";
      }
      this.isNumber = true;
    }
    else{
      if (this.square % 2 == 0){
        this.block.nativeElement.style.cssText="border-color: red; background-color: lightgrey; text-align: center;";
      }
      else {
        this.block.nativeElement.style.cssText="border-color: red; text-align: center;";
      }
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
    if(this.value != "0"){
      this.block.nativeElement.disabled = true;
      this.isNumber = true;
    }
    else{
      this.value = "";
    }
    if (this.square % 2 == 0){
      this.block.nativeElement.style.cssText="border-color: grey; background-color: lightgrey; text-align: center;";
    }
    else{
      this.block.nativeElement.style.cssText="border-color: grey; text-align: center;";
    }
  }

}

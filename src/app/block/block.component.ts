import { Component, OnInit, OnChanges } from '@angular/core';

@Component({
  selector: 'app-block',
  templateUrl: './block.component.html',
  styleUrls: ['./block.component.scss']
})
export class BlockComponent implements OnInit {

  value: string;
  onChange(target: any): void {
    this.value = target.value;
    if (this.value.match(/\b[1-9]\b|$^/g)){
      target.style.cssText="border-color: grey;";
    }
    else{
      target.style.cssText="border-color: red;";
    }
    console.log(target)
  }
  constructor() { }

  ngOnInit() {
  }

}

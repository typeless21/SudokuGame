import { Component, OnInit, ViewChildren, QueryList, AfterViewInit} from '@angular/core';
import { BlockComponent } from '../block/block.component';


@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent implements OnInit {
  numbers: number[];
  @ViewChildren(BlockComponent) blockComponents : QueryList<BlockComponent>;


  constructor() {
    this.numbers = Array(81).fill(0).map((x,i)=>i); // [0,1,2..80]
  }

  ngOnInit() {
    //this.blockComponents.changes.subscribe(c => console.log(this.blockComponents.toArray()));
    //console.log(this.inputComponents.toArray());
  }

  ngAfterViewInit(){
    this.blockComponents.changes.subscribe(c => console.log(this.blockComponents.toArray()));
    //console.log(this.blockComponents.toArray());
  }

  onClickMe(){
    for(let block of this.blockComponents.toArray()){
      if(block.value != null){
        console.log(block);
      }
      //console.log(block)
    }
  }
}

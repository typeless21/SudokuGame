import { Component, OnInit, ViewChildren, QueryList, AfterViewInit} from '@angular/core';
import { AuthService } from '../auth.service';
import { BlockComponent } from '../block/block.component';
import { Router } from '@angular/router';


@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})

export class BoardComponent implements OnInit {

  numbers: number[];
  @ViewChildren(BlockComponent) blockComponents : QueryList<BlockComponent>;
  html: String;
  message: string;
  result: any;

  constructor(private _auth: AuthService,private _router: Router) {
    //this.numbers = Array(81).fill(0).map((x,i)=>i); // [0,1,2..80]
  }

  ngOnInit() {
    this._auth.currentMessage.subscribe(message => this.message = message)

    var diffData = <any>{}
    diffData.diff = this.message
    this._auth.setDiff(diffData)
      .subscribe(
        res => {
          this.result = res
          this.loadBoard()
          //this._router.navigate(['']) // Change later
        },
        err => console.log(err)
    )


    //this.blockComponents.changes.subscribe(c => console.log(this.blockComponents.toArray()));
    //console.log(this.inputComponents.toArray());
  }

  ngAfterViewInit(){
    this.blockComponents.changes.subscribe(c => this.blockComponents.toArray());
    //console.log(this.blockComponents.toArray());
  }

  loadBoard(){
    var numberString = this.result.board;
    this.numbers = [];
    for (var x = 0; x < numberString.length; x++){
      var number = Number(numberString.charAt(x));
      this.numbers.push(number)
    }
    this.startTimer()
  }

  time: number = 0;
  interval: any;

  startTimer() {
    this.interval = setInterval(() => {
        this.time++;
    },1000)
  }

  pauseTimer() {
    clearInterval(this.interval);
  }

  save(){
    this.pauseTimer();
    let numbersString: String = ""
    for(let block of this.blockComponents.toArray()){
      if(block.isNumber == false){
        numbersString = numbersString + "0";
      }
      else{
        numbersString = numbersString + String(block.value);
      }
    }
    console.log(numbersString)
    var gameData = <any>{}
    gameData.board = numbersString
    gameData.time = this.time
    gameData.diff = this.message
    gameData.id = this.result._id

    this._auth.saveGame(gameData)
      .subscribe(
        res => {
          console.log(res)
          //localStorage.setItem('token', res.token) // Sets key as 'token' and value as res.token from serv to browsers local storage
          //this._router.navigate(['']) // The redirected link on succesfull registration
        },
        err => console.log(err)
    )
    this._router.navigate([''])
  }

  checkWin(){
    let allNumbers: boolean = true;
    let gameCompleted: boolean = true;
    let rows: number[][] = [];
    let cols: number[][] = [];
    let squares: number[][] = [];
    rows.push([],[],[],[],[],[],[],[],[]);
    cols.push([],[],[],[],[],[],[],[],[]);
    squares.push([],[],[],[],[],[],[],[],[]);
    for(let block of this.blockComponents.toArray()){
      if(block.isNumber == true){
        rows[block.row].push(Number(block.value));
        cols[block.col].push(Number(block.value));
        squares[block.square].push(Number(block.value));
      }
      else{
        allNumbers = false;
        //console.log(block);
        //break
      }
    }
    if (allNumbers == false){
      //console.log(rows)
      //console.log(cols)
      //console.log(squares)
      console.log("PLEASE FILL ALL SQUARES WITH NUM");
    }
    else{
      console.log(rows);
      for(let row of rows){
        if (!completed(row)){
          gameCompleted = false;
          break;
        }
      }
      if (gameCompleted){
        for(let col of cols){
          if (!completed(col)){
            gameCompleted = false;
            break;
          }
        }
      }
      if (gameCompleted){
        for(let square of squares){
          if (!completed(square)){
            gameCompleted = false;
            break;
          }
        }
      }
      if (gameCompleted){
        console.log("CONGRATS U WIN");
      }
      else{
        console.log("ANSWER IS WRONG");
      }
    }
  }
}

function completed(array) {
  return (array.length == 9) && !((new Set(array)).size !== array.length);
}

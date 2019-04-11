import { Component, OnInit, ViewChildren, QueryList, AfterViewInit,ChangeDetectorRef } from '@angular/core';
import { AuthService } from '../auth.service';
import { BlockComponent } from '../block/block.component';
import { Router } from '@angular/router';


@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})

export class BoardComponent implements OnInit {

  numbers: number[] = [];
  @ViewChildren(BlockComponent) blockComponents : QueryList<BlockComponent>;
  html: String;
  diff: string;
  result: any;
  savedBoard: any;
  default: boolean[] = [];
  continue: boolean

  constructor(private _auth: AuthService,private _router: Router, private changeDetectorRef: ChangeDetectorRef) {
    //this.numbers = Array(81).fill(0).map((x,i)=>i); // [0,1,2..80]
  }

  ngOnInit() {
    this._auth.currentDiff.subscribe(diff => this.diff = diff)
    this._auth.currentCon.subscribe(con => this.continue = con)
    if(this.continue == false){
      this._auth.changeCon(true)
      console.log("Starting new game")
      var diffData = <any>{}
      diffData.diff = this.diff
      this._auth.setDiff(diffData)
        .subscribe(
          res => {
            this.result = res
            console.log(res)
            this.loadBoard()
          },
          err => console.log(err)
      )
    }
    else{
      console.log("Getting saved game")
      this._auth.getSaveGame()
        .subscribe(
          res => {
            this.result = res
          },
          err => console.log(err),
          complete => {
            var boardData = <any>{}
            boardData.boardID = this.result.saved_game_id
            console.log(boardData)
            this._auth.getBoardById(boardData)
              .subscribe(
                res => {
                  this.savedBoard = res
                  console.log(res)
                },
                err => console.log(err),
                complete => this.loadSavedBoard()
            )
          }
      )
    }
  }


  ngAfterViewInit(){
    this.blockComponents.changes.subscribe(c => this.blockComponents.toArray());
    //console.log(this.blockComponents.toArray());
  }

  loadBoard(){
    var numberString = this.result.board;
    for (var x = 0; x < numberString.length; x++){
      var number = Number(numberString.charAt(x));
      if (number == 0){
        this.default.push(false)
      }
      else{
        this.default.push(true)
      }
      this.numbers.push(number)
    }
    this.startTimer()
  }

  loadSavedBoard(){
    let boardSaved = this.result.saved_game
    let boardTemplate = this.savedBoard.board

    this.numbers = [];
    for (var x = 0; x < boardSaved.length; x++){
      let numberSaved = Number(boardSaved.charAt(x));
      let numberTemplate = Number(boardTemplate.charAt(x));
      if (numberSaved == numberTemplate && numberSaved != 0){
        this.default.push(true)
      }
      else{
        this.default.push(false)
      }
      this.numbers.push(numberSaved)
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
    gameData.diff = this.diff
    gameData.id = this.result._id

    this._auth.saveGame(gameData)
      .subscribe(
        res => {

        },
        err => console.log(err)
    )
    this._router.navigate([''])
  }

  checkWin(){
    this.changeDetectorRef.detectChanges()
    let allNumbers: boolean = true;
    let gameCompleted: boolean = true;
    let rows: number[][] = [];
    let cols: number[][] = [];
    let squares: number[][] = [];
    rows.push([],[],[],[],[],[],[],[],[]);
    cols.push([],[],[],[],[],[],[],[],[]);
    squares.push([],[],[],[],[],[],[],[],[]);
    for(var x = 0; x < this.blockComponents.toArray().length; x++){
    // for(let block of this.blockComponents.toArray()){
      let block = this.blockComponents.toArray()[x]
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
        var gameData = <any>{}
        gameData.diff = this.diff
        gameData.time = this.time
        this._auth.updateHS(gameData)
          .subscribe(
            res => {
              this.result = res
              console.log(res)
            },
            err => console.log(err)
        )
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

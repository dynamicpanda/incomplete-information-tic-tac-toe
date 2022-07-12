import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: [ './board.component.scss'
  ]
})
export class BoardComponent implements OnInit {

  squares: any[];
  xIsNext: boolean;
  winner: string;
  user: string;

  constructor() {  
    this.squares = [];
    this.xIsNext = true;
    this.winner = ""; 
    this.user = "";
  }

  ngOnInit(): void {
    this.newGame();
  }

  newGame() {
    this.squares = Array(9).fill(null);
    this.xIsNext = true;
    this.winner = "";
    this.user = this.user == 'X' ? 'O' : 'X';

    if (this.player != this.user)
      this.makePcMove();
  }

  get player() {
    return this.xIsNext ? 'X' : 'O';
  }

  get playerDescription() {
    return this.player == this.user ? 'You' : 'The computer';
  }

  makeMove(idx: number) {
    this.squares.splice(idx, 1, this.player);
    this.winner = this.calculateWinner();
    if (!this.winner)
      this.xIsNext = !this.xIsNext;
  }

  makePlayerMove(idx: number) {
    if (!this.squares[idx] && !this.winner) {
      this.makeMove(idx);

      if (!this.winner)
        this.makePcMove();
    }
  }

  async makePcMove() {

    // t h i n k i n g
    await (() => new Promise( resolve => setTimeout(resolve, 1000)))();

    // super simple for now: pick first empty spot
    for (let idx = 0; idx < this.squares.length; idx++) {
      if (!this.squares[idx]) {
        this.makeMove(idx);
        return;
      }
    }
  }

  calculateWinner() {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6]
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (
        this.squares[a] &&
        this.squares[a] === this.squares[b] &&
        this.squares[a] === this.squares[c]
      ) {
        return this.squares[a];
      }
    }
    return null;
  }

}

import { Component, OnInit } from '@angular/core';

export class Player {
  GOALS: string[];
  name: string;
  token: string;
  goal: string;
  goalMet: boolean;

  constructor(name: string) {
    this.GOALS = ["win", "lose", "tie"];
    this.name = name;
    this.token = "";
    this.goal = this.GOALS[Math.floor(Math.random() * this.GOALS.length)];
    this.goalMet = false;
  }

  evaluateGoal(result: string) {
    this.goalMet = result == this.goal;
    return this.goalMet;
  }
}

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
  goals: string[];
  userPlayer: Player;
  pcPlayer: Player;

  constructor() {  
    this.squares = [];
    this.xIsNext = true;
    this.winner = ""; 
    this.goals = ["win", "lose", "tie"];
    this.userPlayer = new Player("You");
    this.pcPlayer = new Player("The Computer");
  }

  ngOnInit(): void {
    this.newGame();
  }

  newGame() {
    this.squares = Array(9).fill(null);
    this.xIsNext = true;
    this.winner = "";
    this.userPlayer.token = this.userPlayer.token == 'X' ? 'O' : 'X';
    this.pcPlayer.token = this.userPlayer.token == 'X' ? 'O' : 'X';

    if (this.currentPlayer != this.userPlayer.token)
      this.makePcMove();
  }

  get currentPlayer() {
    return this.xIsNext ? 'X' : 'O';
  }

  get currentPlayerDescription() {
    if (this.currentPlayer == this.userPlayer.token)
      return this.userPlayer.name;
    return this.pcPlayer.name;
  }

  makeMove(idx: number) {
    this.squares.splice(idx, 1, this.currentPlayer);
    this.winner = this.calculateWinner();

    // evaluate whether each player acheived their goal
    if (this.winner == null) {
      this.xIsNext = !this.xIsNext;
    }
    if (this.winner == this.userPlayer.name) {
      this.userPlayer.evaluateGoal("win");
      this.pcPlayer.evaluateGoal("lose");
    }
    else if (this.winner == this.pcPlayer.name) {
      this.userPlayer.evaluateGoal("lose");
      this.pcPlayer.evaluateGoal("win");
    }
    // TODO: implement tie logic in winner calculation
    else {
      this.userPlayer.evaluateGoal("tie");
      this.pcPlayer.evaluateGoal("tie");
    }
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

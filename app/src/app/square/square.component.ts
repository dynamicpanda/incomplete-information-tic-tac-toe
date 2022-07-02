import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-square',
  template: `
    <button style="width: 100%; height: 100%; display: block;">{{ value }}</button>
  `,
  styles: []
})
export class SquareComponent implements OnInit {

  @Input() value: 'X' | 'O' | '';

  constructor() { 
    this.value = '';
  }

  ngOnInit(): void {
  }

}

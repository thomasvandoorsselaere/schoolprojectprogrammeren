import { Component, OnInit } from '@angular/core';

@Component({
  template: `
    <h3 class="errorMessage">Something went wrong, this is not the page you want to see... ever</h3>
  `,
  styles: [`
    .errorMessage { 
      margin-top:150px; 
      font-size: 70px;
      text-align: center; 
    }`]
})
export class ErrorPageComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}

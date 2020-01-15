import { Component } from '@angular/core';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.css' ]
})
export class AppComponent  {
  date = new Date();

  constructor() {
    setInterval(() => {
      this.date = new Date()
    }, 1000)
  }

  print(){
    window.print();
  }
}

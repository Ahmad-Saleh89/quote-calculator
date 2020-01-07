import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-current-special',
  templateUrl: './current-special.component.html',
  styleUrls: ['./current-special.component.css']
})
export class CurrentSpecialComponent implements OnInit {

  currentMonth = new Date();

  constructor() { }

  ngOnInit() {
  }

}
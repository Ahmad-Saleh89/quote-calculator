import { Component, OnInit, Input } from '@angular/core';
import { Course } from '../../classes/course';

@Component({
  selector: 'option-panel',
  templateUrl: './option-panel.component.html',
  styleUrls: ['./option-panel.component.css']
})
export class OptionPanelComponent implements OnInit {

  @Input() courses: Course[];

  constructor() { }

  ngOnInit() {
  }

}
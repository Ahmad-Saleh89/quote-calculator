import { Component, OnInit } from '@angular/core';
import { SpecialsService } from '../services/specials.service';

@Component({
  selector: 'app-current-special',
  templateUrl: './current-special.component.html',
  styleUrls: ['./current-special.component.css']
})
export class CurrentSpecialComponent implements OnInit {

  allCourses;
  titles = [];

  currentMonth = new Date();

  constructor(private specialsService: SpecialsService) { }

  ngOnInit() {
    this.allCourses = this.specialsService.getCourses();
    this.titles = this.specialsService.getTitles();
  }

}
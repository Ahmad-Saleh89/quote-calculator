import { Component, OnInit } from '@angular/core';
import { CoursesService } from '../services/courses.service';


@Component({
  selector: 'app-regular-price',
  templateUrl: './regular-price.component.html',
  styleUrls: ['./regular-price.component.css']
})
export class RegularPriceComponent implements OnInit {

  selectedCourses = [];

  constructor(private courseService: CoursesService) { }

  ngOnInit() {
    this.courseService.selectedObs.subscribe(data => {
      this.selectedCourses = data;
      console.log(this.selectedCourses);
    });
  }

  chooseOption(index) {
    this.courseService.chooseOption(index);
  }
}
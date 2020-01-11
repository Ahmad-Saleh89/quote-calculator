import { Component, OnInit } from '@angular/core';
import { CoursesService } from '../services/courses.service';
import { BehaviorSubject } from 'rxjs';



@Component({
  selector: 'app-regular-price',
  templateUrl: './regular-price.component.html',
  styleUrls: ['./regular-price.component.css']
})
export class RegularPriceComponent implements OnInit {

  selectedCourses = [];

  index = 0;

  discount = 40;

  constructor(private courseService: CoursesService) { }

  ngOnInit() {
    this.courseService.selectedObs.subscribe(data => {
      this.selectedCourses = data;
      // console.log(this.selectedCourses);
    });
  }

  chooseOption(index) {
    this.index = index;
    this.courseService.chooseOption(index);
  }

  onChange(){
    this.courseService.onDiscountChange(this.discount);
  }
}
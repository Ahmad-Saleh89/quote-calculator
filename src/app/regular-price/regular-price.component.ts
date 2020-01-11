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

  discount = "40";

  // [Total Cost for each Option Panel , Chosen Discount, Chosen Plan]
  totalCosts = [0, 0, 0, 40, 12];

  constructor(private courseService: CoursesService) { }

  ngOnInit() {
    this.courseService.selectedCoursesObs.subscribe(data => {
      this.selectedCourses = data;
    });

    this.courseService.totalCostsObs.subscribe(costs => {
      this.totalCosts = costs;
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
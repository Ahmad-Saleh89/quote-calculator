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

  // Index of The Option Panel
  index = 0;

  discount = "40";

  // [Option 1 Monthly Cost , Option 2 Monthly Cost , Option 3 Monthly Cost , Chosen Discount, Chosen Plan]
  monthlyCost = [0, 0, 0, 40, 12];

  listPrices = [0, 0, 0];

  constructor(private courseService: CoursesService) { }

  ngOnInit() {
    this.courseService.selectedCourses$.subscribe(data => {
      this.selectedCourses = data;
      this.listPrices = [0, 0, 0];
      this.selectedCourses.map((option, x) => {
        if(option.length) {
          option.map(course => {
            this.listPrices[x] += course.price;
            console.log(this.listPrices)
          })
        }
      })
    });

    this.courseService.monthlyCost$.subscribe(costs => {
      this.monthlyCost = costs;
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
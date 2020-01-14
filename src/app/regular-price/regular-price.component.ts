import { Component, OnInit } from '@angular/core';
import { CoursesService } from '../services/courses.service';

@Component({
  selector: 'app-regular-price',
  templateUrl: './regular-price.component.html',
  styleUrls: ['./regular-price.component.css']
})
export class RegularPriceComponent implements OnInit {

  allCourses;
  titles;

  selectedCourses = [];

  // Index of The Option Panel
  index = 0;

  discount;

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
          })
        }
      })
    });

    this.allCourses = this.courseService.getCourses();
    this.titles = this.courseService.getTitles();

    this.courseService.monthlyCost$.subscribe(costs => {
      this.monthlyCost = costs;
      this.discount = this.monthlyCost[3];
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
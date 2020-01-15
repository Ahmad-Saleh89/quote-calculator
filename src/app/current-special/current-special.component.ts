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

  selectedCourses = [];

  // Index of The Option Panel
  index = 0;

  currentMonth = new Date();

  // [Option 1 Monthly Cost , Option 2 Monthly Cost , Option 3 Monthly Cost , Chosen Plan]
  monthlyCost = [0, 0, 0, 40, 12];

  listPrices = [0, 0, 0];
  constructor(private specialsService: SpecialsService) { }

  ngOnInit() {
    this.specialsService.selectedCourses$.subscribe(data => {
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

    this.allCourses = this.specialsService.getCourses();
    this.titles = this.specialsService.getTitles();

    this.specialsService.monthlyCost$.subscribe(costs => {
      this.monthlyCost = costs;
    });
  }

  chooseOption(index) {
    this.index = index;
    this.specialsService.chooseOption(index);
  }

}
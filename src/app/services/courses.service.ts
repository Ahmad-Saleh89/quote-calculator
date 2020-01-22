import { Injectable } from '@angular/core';
import { COURSES } from '../data/courses';
import { Subject, BehaviorSubject } from 'rxjs';


@Injectable()
export class CoursesService {

  courses = COURSES;
  titles = [];

  // 0 , 1, 2 represent the index of each Option Panel
  index = 0;
  // 3 arrays -> each one represents an Option | remember we have 3 Option Panels
  selectedCourses = [[], [], []];

  // Payment Plan 12 months OR 24 months
  plan = 12;

  // Default Discount
  discount = 40;

  // [Option 1 Monthly Cost , Option 2 Monthly Cost , Option 3 Monthly Cost , Chosen Discount, Chosen Plan]
  monthlyCost = [0, 0, 0, this.discount, this.plan];

  private selectedCoursesSource = new Subject();
  selectedCourses$ = this.selectedCoursesSource.asObservable();

  private activeOptionSource = new BehaviorSubject(0);
  activeOption$ = this.activeOptionSource.asObservable();

  private monthlyCostSource = new BehaviorSubject(this.monthlyCost);
  monthlyCost$ = this.monthlyCostSource.asObservable();

  constructor() { }

  getCourses() {
    this.selectedCoursesSource.next(this.selectedCourses);
    return this.courses;
  }

  getTitles() {
    this.titles = [];
    for( const course of this.courses) {
      this.titles.push(...Object.keys(course));
    }
    return this.titles;
  }

  getPlan() {
    return this.plan;
  }

  choosePlan(plan){
    this.plan = plan;
    this.monthlyCost[4] = this.plan;
    this.selectedCourses.map((option, index) => {
    if(option.length){
        this.updatePrices(index);
      }
    });
  }

  onDiscountChange(discount: string) {
    this.discount = parseInt(discount);
    this.monthlyCost[3] = this.discount;

    this.selectedCourses.map((option, index) => {
    if(option.length){
        this.updatePrices(index);
      }
    });
  }

  chooseOption(x) {
    this.activeOptionSource.next(x);
    this.index = x;
    // Loop through all options and un-select all courses
    this.selectedCourses.map(options => {
      if(options.length){
        options.map(course => course.selected = false);
      }
    })
    // Loop through the selected Option and reassign selected to true
    if(this.selectedCourses[x].length){
      this.selectedCourses[x].map(x => x.selected = true);
    }
  }

  selectCourse(course){
    course.selected = !course.selected;
    for (let val of this.selectedCourses[this.index]) {
      if(course.name === val.name) {
        this.deleteCourse(course);
        return;
      }
    }
    this.selectedCourses[this.index].push(course);
    this.selectedCoursesSource.next(this.selectedCourses);
    this.updatePrices(this.index);
  }

  deleteCourse(course) { 
    course.selected ? course.selected = false : null;
    this.selectedCourses[this.index].splice(this.selectedCourses[this.index].indexOf(course), 1);
    this.updatePrices(this.index);
    this.selectedCoursesSource.next(this.selectedCourses);
  }

  updatePrices(index) {
    this.monthlyCost[index] = 0;
    this.selectedCourses[index].map((course) => {
      course.planPrice = course.price / this.plan;
      course.discountPrice = course.planPrice - (course.planPrice * this.discount / 100);
      this.monthlyCost[index] += course.discountPrice;
    });
    this.monthlyCostSource.next(this.monthlyCost);
  }

  clearOption(index){
    this.selectedCourses[index].map(course => course.selected = false); 
    this.selectedCourses[index] = [];
    this.monthlyCost[index] = 0;
    this.selectedCoursesSource.next(this.selectedCourses);
  }

  clearAll() {
    this.selectedCourses.map((option, index) => {
      if(option.length){
          this.clearOption(index);
        }
    });
  }
}
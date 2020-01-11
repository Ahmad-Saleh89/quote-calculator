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

  totalCost = [];

  private selectedCoursesSource = new Subject();
  selectedObs = this.selectedCoursesSource.asObservable();

  private activeOptionSource = new BehaviorSubject(0);
  activeOption = this.activeOptionSource.asObservable();

  constructor() { }

  getTitles() {
    for( const course of this.courses) {
      this.titles.push(...Object.keys(course));
    }
    return this.titles;
  }

  choosePlan(plan){
    this.plan = plan;
    this.updatePrices();
  }

  onDiscountChange(discount) {
    this.discount = discount;
    this.updatePrices();
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
    // course.planPrice = course.price / this.plan;
    this.selectedCourses[this.index].push(course);
    this.selectedCoursesSource.next(this.selectedCourses);
    this.updatePrices();

  }

  deleteCourse(course) { 
    course.selected ? course.selected = false : null;
    this.selectedCourses[this.index].splice(this.selectedCourses[this.index].indexOf(course), 1);
    this.updatePrices();
  }

  updatePrices() {
    this.totalCost = 0;
    this.selectedCourses.map(options => {
      if(options.length){
        options.map(course => {
          course.planPrice = course.price / this.plan;
          course.discountPrice = course.planPrice - (course.planPrice * this.discount / 100);
        });
      }
    });
  }

  clearOption(x){
    this.selectedCourses[x].map(x => x.selected = false);
    this.selectedCourses[x] = []; 
  }
}
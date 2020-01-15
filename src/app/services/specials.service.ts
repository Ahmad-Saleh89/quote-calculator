import { Injectable } from '@angular/core';
import { SPECIALCOURSES } from '../data/special-courses';
import { Subject, BehaviorSubject } from 'rxjs';


@Injectable()
export class SpecialsService {

  courses = SPECIALCOURSES;
  titles = [];

  // 0 , 1, 2 represent the index of each Option Panel
  index = 0;
  // 3 arrays -> each one represents an Option | remember we have 3 Option Panels
  selectedCourses = [[], [], []];

  // Payment Plan 12 months OR 24 months
  plan = 12;


  // [Option 1 Monthly Cost , Option 2 Monthly Cost , Option 3 Monthly Cost , Chosen Plan]
  monthlyCost = [0, 0, 0, this.plan];

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
    this.monthlyCost = [0, 0, 0, this.plan];
    this.selectedCourses.map((option, index) => {
      if(option.length){
        this.updatePrices(index);
      }
    });
    this.monthlyCostSource.next(this.monthlyCost);
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
    this.selectedCourses[this.index].sort((a, b) => b.price - a.price);
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
    this.selectedCourses[index].map((course, courseIndex) => {
      course.specialPrice = course.price;
      if(courseIndex % 2 !== 0) {
        course.specialPrice = 50;
      }
      this.monthlyCost[index] += (course.specialPrice);
    });
    this.monthlyCostSource.next(this.monthlyCost);
  }

  clearOption(index){
    this.selectedCourses[index].map(course => course.selected = false); 
    this.selectedCourses[index] = [];
    this.monthlyCost[index] = 0;
    this.selectedCoursesSource.next(this.selectedCourses);
  }
}
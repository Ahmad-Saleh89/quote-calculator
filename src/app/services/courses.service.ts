import { Injectable } from '@angular/core';
import { COURSES } from '../data/courses';
import { Subject, BehaviorSubject } from 'rxjs';


@Injectable()
export class CoursesService {

  courses = COURSES;
  titles = [];

  index = 0;
  optionOne = []; // index = 0
  optionTwo = []; // index = 1
  optoinThree = []; // index = 2

  selectedCourses = [this.optionOne, this.optionTwo, this.optoinThree];

  // Payment Plan 12 months OR 24 months
  plan = 12;

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
    this.selectedCourses.map(options => {
      if(options.length){
        options.map(course => course.planPrice = course.price / this.plan);
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
    course.planPrice = course.price / this.plan;
    this.selectedCourses[this.index].push(course);
    this.selectedCoursesSource.next(this.selectedCourses);
  }

  deleteCourse(course) { 
    course.selected ? course.selected = false : null;
    this.selectedCourses[this.index].splice(this.selectedCourses[this.index].indexOf(course), 1);
  }

  clearOption(x){
    this.selectedCourses[x].map(x => x.selected = false);
    this.selectedCourses[x] = []; 
  }
}
import { Injectable } from '@angular/core';
import { COURSES } from '../data/courses';
import { Subject } from 'rxjs';


@Injectable()
export class CoursesService {

  courses = COURSES;
  titles = [];

  optionOne = []; // index = 0
  optionTwo = []; // index = 1
  optoinThree = []; // index = 2

  selectedCourses = [this.optionOne, this.optionTwo, this.optoinThree];

  index = 0;

  private selectedCoursesSource = new Subject();
  selectedObs = this.selectedCoursesSource.asObservable();

  constructor() { }

  getTitles() {
    for( const course of this.courses) {
      this.titles.push(...Object.keys(course));
    }
    return this.titles;
  }

  chooseOption(x) { 
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
        this.deleteCourse(this.selectedCourses[this.index].indexOf(val));
        return;
      }
    }
    this.selectedCourses[this.index].push(course);
    this.selectedCoursesSource.next(this.selectedCourses);
    // console.log(this.selectedCourses)
  }

  deleteCourse(course) {
    course.selected = false;
    this.selectedCourses[this.index].splice(course, 1)
  }

}
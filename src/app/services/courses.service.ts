import { Injectable } from '@angular/core';
import { COURSES } from '../data/courses';
import { Subject } from 'rxjs';


@Injectable()
export class CoursesService {

  courses = COURSES;
  titles = [];

  optionOne = [];
  optionTwo = [];
  optoinThree = [];

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
    console.log(this.index);
  }

  selectCourse(course){
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
    this.selectedCourses[this.index].splice(course, 1)
  }

}
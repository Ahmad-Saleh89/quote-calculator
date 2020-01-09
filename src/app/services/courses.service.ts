import { Injectable } from '@angular/core';
import { COURSES } from '../data/courses';
import { Subject } from 'rxjs';


@Injectable()
export class CoursesService {

  courses = COURSES;
  titles = [];
  selectedCourses = [];

  private selectedCoursesSource = new Subject();
  selectedObs = this.selectedCoursesSource.asObservable();

  constructor() { }

  getTitles() {
    for( const course of this.courses) {
      this.titles.push(...Object.keys(course));
    }
    return this.titles;
  }

  selectCourse(course){
    for (let val of this.selectedCourses) {
      if(course.name === val.name) {
        this.deleteCourse(this.selectedCourses.indexOf(val));
        return;
      }
    }
    this.selectedCourses.push(course);
    this.selectedCoursesSource.next(this.selectedCourses);
    // console.log(this.selectedCourses)
  }

  deleteCourse(course) {
    this.selectedCourses.splice(course, 1)
  }

}
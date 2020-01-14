import { Injectable } from '@angular/core';
import { SPECIALCOURSES } from '../data/special-courses';


@Injectable()
export class SpecialsService {

  courses = SPECIALCOURSES;
  titles = [];

  constructor() { }

  getCourses() {
    // this.selectedCoursesSource.next(this.selectedCourses);
    return this.courses;
  }

  getTitles() {
    this.titles = [];
    for( const course of this.courses) {
      this.titles.push(...Object.keys(course));
    }
    return this.titles;
  }
}
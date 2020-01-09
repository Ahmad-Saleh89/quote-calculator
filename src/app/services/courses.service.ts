import { Injectable } from '@angular/core';

@Injectable()
export class CoursesService {

  selectedCourses = [];

  constructor() { }

  selectCourse(course){
    for (let val of this.selectedCourses) {
      if(course.name === val.name) {
        this.deleteCourse(this.selectedCourses.indexOf(val));
        return;
      }
    }
    this.selectedCourses.push(course);
    console.log(this.selectedCourses)
  }

  deleteCourse(course) {
    this.selectedCourses.splice(course, 1)
  }

}
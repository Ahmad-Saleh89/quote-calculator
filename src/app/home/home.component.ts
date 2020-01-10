import { Component, OnInit } from '@angular/core';
import { CoursesService } from '../services/courses.service';
import { COURSES } from '../data/courses';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  courses = COURSES;

  titles = [];

  selectedCourses = [];

  constructor(private coursesService: CoursesService) { }

  ngOnInit() {
    this.titles = this.coursesService.getTitles();
  }

  onSelect(course){
    this.coursesService.selectCourse(course);
  }

}
import { Component, OnInit } from '@angular/core';
import { CoursesService } from '../services/courses.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  courses;

  titles = [];

  constructor(private coursesService: CoursesService, private router: Router) { }

  ngOnInit() {
    this.courses = this.coursesService.getCourses();
    this.titles = this.coursesService.getTitles();
  }

  onSelect(course){
    if(this.router.url === '/home'){
      this.coursesService.selectCourse(course);
    }else{
    console.log(this.router.url)

    }
  }
}
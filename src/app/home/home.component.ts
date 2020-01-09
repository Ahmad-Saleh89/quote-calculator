import { Component, OnInit } from '@angular/core';
import { CoursesService } from '../services/courses.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  courses = [
    {
      "Web Development": [
        {
          name: "HTML / CSS",
          price: 200
        },
        {
          name: "JavaScript",
          price: 250
        },
        {
          name: "Angular",
          price: 300
        }
      ]
    },
    {
      Music: [
        {
          name: "Violin",
          price: 330
        },
        {
          name: "Drums",
          price: 180
        }
      ]
    }
  ]

  titles = [];

  selectedCourses = [];

  constructor(private coursesService: CoursesService) { }

  ngOnInit() {
    for( const course of this.courses) {
      this.titles.push(...Object.keys(course));
    }
  }

  onSelect(course){
    course.selected = !course.selected;
    this.coursesService.selectCourse(course);
  }

}
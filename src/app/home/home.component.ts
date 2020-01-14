import { Component, OnInit, Input } from '@angular/core';
import { CoursesService } from '../services/courses.service';
import { SpecialsService } from '../services/specials.service';

import { Router } from '@angular/router';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  // get all courses from the parent component
  @Input() courses;
  @Input() titles;

  constructor(private courseService: CoursesService, private specialsService: SpecialsService, private router: Router) { }

  ngOnInit() {
  }

  onSelect(course){
    if(this.router.url === '/home'){
      this.courseService.selectCourse(course);
    }else{
      this.specialsService.selectCourse(course);
    }
  }
}
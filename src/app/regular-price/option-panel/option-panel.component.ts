import { Component, OnInit, Input } from '@angular/core';
import { Course } from '../../classes/course';
import { CoursesService } from '../../services/courses.service';


@Component({
  selector: 'option-panel',
  templateUrl: './option-panel.component.html',
  styleUrls: ['./option-panel.component.css']
})
export class OptionPanelComponent implements OnInit {

  @Input() courses: Course[];
  @Input("index") optionIndex: Number;

  activeOptionIndex = 0;

  constructor(private courseService: CoursesService) { }

  ngOnInit() {
    this.courseService.activeOption.subscribe(index => {
      this.activeOptionIndex = index;
      // console.log(this.selectedCourses);
    });
  }

  deleteCourse(course){
    this.courseService.deleteCourse(course);
  }

  clearOption(index){
    this.courseService.clearOption(index);
  }
}
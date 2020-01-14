import { Component, OnInit, Input } from '@angular/core';
import { Course } from '../../classes/course';
import { CoursesService } from '../../services/courses.service';


@Component({
  selector: 'option-panel',
  templateUrl: './option-panel.component.html',
  styleUrls: ['./option-panel.component.css']
})
export class OptionPanelComponent implements OnInit {

  // These are the selected courses of this very Option Panel
  @Input('courses') selectedCourses: Course[];

  // This represents the index of the selected Option Panel
  @Input("index") optionIndex: Number;

  // [cost] = [Monthly Cost of this Option Panel , Chosen Discount, Chosen Plan] 
  @Input() cost;

  // Total price before any discount
  @Input() listPrice;

  // To compare the current active option with the selected one | For UI purpose only
  activeOptionIndex = 0;

  constructor(private courseService: CoursesService) { }

  ngOnInit() {
    this.courseService.activeOption$.subscribe(index => {
      this.activeOptionIndex = index;
      // console.log(this.selectedCourses);
    });
  }

  deleteCourse(course){
    this.courseService.deleteCourse(course);
  }

  clearOption(index){
    this.courseService.clearOption(index);
    // this.listPrice = 0;
  }
  
}
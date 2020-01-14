import { Component, OnInit, Input } from '@angular/core';
import { Course } from '../../classes/course';
import { SpecialsService } from '../../services/specials.service';


@Component({
  selector: 'special-panel',
  templateUrl: './special-panel.component.html',
  styleUrls: ['./special-panel.component.css']
})
export class SpecialPanelComponent implements OnInit {

  // These are the selected courses of this very Option Panel
  @Input() courses: Course[];

  // This represents the index of the selected Option Panel
  @Input("index") optionIndex: Number;

  // [cost] = [Monthly Cost of this Option Panel , Chosen Discount, Chosen Plan] 
  @Input() cost;

  // Total price before any discount
  @Input() listPrice;

  // To compare the current active option with the selected one | For UI purpose only
  activeOptionIndex = 0;

  constructor(private specialsService: SpecialsService) { }

  ngOnInit() {
    this.specialsService.activeOption$.subscribe(index => {
      this.activeOptionIndex = index;
      // console.log(this.selectedCourses);
    });
  }

  deleteCourse(course){
    this.specialsService.deleteCourse(course);
  }

  clearOption(index){
    this.specialsService.clearOption(index);
    // this.listPrice = 0;
  }
}
import { Component, OnInit } from '@angular/core';
import { CoursesService } from '../../services/courses.service';

@Component({
  selector: 'payment-plan',
  templateUrl: './payment-plan.component.html',
  styleUrls: ['./payment-plan.component.css']
})
export class PaymentPlanComponent implements OnInit {

  selected = true;

  constructor(private courseService: CoursesService) { }

  ngOnInit() { }

  choosePlan(plan){
    this.selected = !this.selected;
    this.courseService.choosePlan(plan);
  }
}
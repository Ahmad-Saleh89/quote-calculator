import { Component, OnInit } from '@angular/core';
import { CoursesService } from '../../services/courses.service';

@Component({
  selector: 'payment-plan',
  templateUrl: './payment-plan.component.html',
  styleUrls: ['./payment-plan.component.css']
})
export class PaymentPlanComponent implements OnInit {

  selected = true;

  plan = 12; // by default

  constructor(private courseService: CoursesService) { }

  ngOnInit() {
    this.plan = this.courseService.getPlan();
  }

  choosePlan(plan){
    this.plan = plan;
    this.courseService.choosePlan(plan);
  }
}
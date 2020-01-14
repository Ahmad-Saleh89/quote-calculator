import { Component, OnInit } from '@angular/core';
import { CoursesService } from '../../services/courses.service';
import { SpecialsService } from '../../services/specials.service';

import { Router } from '@angular/router';


@Component({
  selector: 'payment-plan',
  templateUrl: './payment-plan.component.html',
  styleUrls: ['./payment-plan.component.css']
})
export class PaymentPlanComponent implements OnInit {

  selected = true;

  plan = 12; // by default

  constructor(private courseService: CoursesService, private specialsService: SpecialsService, private router: Router) { }

  ngOnInit() {
    if(this.router.url === '/home'){
      this.plan = this.courseService.getPlan();
    }else{
      this.plan = this.specialsService.getPlan();
    }
  }

  choosePlan(plan){
    this.plan = plan;
    if(this.router.url === '/home') {
      this.courseService.choosePlan(plan);
    }else {
      this.specialsService.choosePlan(plan);
    }
  }

}
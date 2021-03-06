import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {

  myDate = new Date();
  // https://angular.io/api/common/DatePipe

  isAuthenticated = false;
  private userSub: Subscription;

  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.userSub = this.authService.user.subscribe(user => {
      // this.isAuthenticated = !!user;
      this.isAuthenticated = !user ? false : true;
    })
  }

  ngOnDestroy() {
    // this.userSub.unsubscribe();
  }

  logout() {
    this.authService.logout();
  }

}
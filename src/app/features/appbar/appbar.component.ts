import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonService } from '../../shared/services/common.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-appbar',
  templateUrl: './appbar.component.html',
  styleUrls: ['./appbar.component.scss'],
})
export class AppbarComponent implements OnInit, OnDestroy {
  private subscription = new Subscription();
  isConnected: boolean = false;

  constructor(private route: Router, private commonService: CommonService) {}

  ngOnInit(): void {
    this.subscription.add(
      this.commonService.data$.subscribe((res) => (this.isConnected = res))
    );
  }

  onHomeClicked() {
    this.route.navigate(['/ceilings']);
  }

  onLoginClicked() {
    this.route.navigate(['/login']);
  }

  onRegisterClicked() {
    this.route.navigate(['/register']);
  }

  onLogoutClicked() {
    this.commonService.logoutClicked(true);
    this.isConnected = false;
    this.route.navigate(['/login']);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}

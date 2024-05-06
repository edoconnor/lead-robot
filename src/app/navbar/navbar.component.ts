import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent {
  constructor(private router: Router, private route: ActivatedRoute) {}

  isOnMainRoute(): boolean {
    return this.router.url === '/' || this.router.url === '/main';
  }
}

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-test-page',
  templateUrl: './test-page.page.html',
  styleUrls: ['./test-page.page.scss'],
})
export class TestPagePage implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  // Pop test-page off the navigation stack
  popTestPageOffStack() {
    this.router.navigateByUrl('/home');
  }

}

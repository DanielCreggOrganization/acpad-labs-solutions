import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-test-page',
  templateUrl: './test-page.page.html',
  styleUrls: ['./test-page.page.scss'],
})
export class TestPagePage implements OnInit {
  text: string = '';

  constructor(private router: Router, private route: ActivatedRoute) { }
  
  ngOnInit() {
    this.route.params.subscribe(params => {
      this.text = params['text'];
    });
  }

  // Pop test-page off the navigation stack
  popTestPageOffStack() {
    this.router.navigateByUrl('/home');
  }

}

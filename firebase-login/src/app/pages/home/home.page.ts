import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { TasksService } from 'src/app/services/tasks.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  constructor(
    private authService: AuthService,
    private router: Router,
    private tasksService : TasksService
  ) {
    // Add a task when the home page is loaded. Completed flase means that the task is not completed. 
    // This means that the task is not checked which means that the checkbox is not checked.
    this.tasksService.addTask({title: 'My test task', completed: false});
  }

  async logout() {
    this.authService.logout();
    // When logout, redirect to login page.
    // Replace the current page in the history stack so that the user won't be able to go back to the home page after logout.
    this.router.navigateByUrl('/', { replaceUrl: true });
  }
}

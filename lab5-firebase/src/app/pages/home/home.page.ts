import { Component, ViewChild } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { TasksService, Task } from '../../services/tasks.service';
import {
  CheckboxCustomEvent,
  IonModal,
  LoadingController,
  AlertController,
} from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  newTask!: Task; // This is the task that will be added to the database.
  @ViewChild(IonModal) modal!: IonModal; // This is a reference to the modal in the HTML.
  tasks = this.tasksService.readTasks(); // This is an observable that will emit the current value of the tasks array.

  constructor(
    private authService: AuthService,
    private router: Router,
    private tasksService: TasksService,
    private loadingController: LoadingController,
    private alertController: AlertController
  ) {
    this.resetTask(); // Initialize the newTask property.
  }

  // This method is used to log the user out. The button will be found in the top right corner of the home page.
  async logout() {
    // Call the logout method in the auth service. Use await to wait for the logout to complete before continuing.
    await this.authService.logout();
    // Navigate to the login page with the replaceUrl option.
    // This means that the login page will replace the home page in the navigation stack.
    this.router.navigateByUrl('/', { replaceUrl: true });
  }

  cancel() {
    this.modal.dismiss(null, 'cancel');
    this.resetTask();
  }

  resetTask() {
    this.newTask = {
      content: '',
      completed: false,
    };
  }

  // This method is used to add a task to the database
  async addTask() {
    const loading = await this.loadingController.create();
    // await means that the code will wait for the loading to be presented before continuing
    await loading.present();
    // Add the task to the database
    this.tasksService.createTask(this.newTask);
    // Dismiss the loading
    await loading.dismiss();
    // Dismiss the modal
    this.modal.dismiss(null, 'confirm');
    // Reset the task. This will clear the input in the modal.
    this.resetTask();
  }

  // This method is used to update the checkbox in the UI when the user toggles the checkbox
  async toggleTask(ionCheckboxEvent: Event, task: Task) {
    task.completed = (ionCheckboxEvent as CheckboxCustomEvent).detail.checked;
    await this.tasksService.toggleTaskCompleted(task);
  }

  async updateTask() {
    await this.tasksService.updateTask(this.newTask);
    this.resetTask();
  }

  deleteTask(task: Task) {
    // Print task to console
    console.log('Deleting task: ', task);
    this.tasksService.deleteTask(task);
  }

  async openUpdateInput(task: Task) {
    const alert = await this.alertController.create({
      header: 'Update Task',
      inputs: [
        {
          name: 'Task',
          type: 'text',
          placeholder: 'Task content',
          value: task.content,
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
        },
        {
          text: 'Update',
          // Call the updateTask method when the user clicks the update button
          handler: (data) => {
            task.content = data.Task;
            this.tasksService.updateTask(task);
          },
        },
      ],
    });
    await alert.present(); // Present the alert to the user
    // Get the alert's first input element and focus the mouse blinker on it. 
    // The setTimeout function is used to allow some time for the browser to render the alert's DOM elements. 
    setTimeout(() => {
      const firstInput: any = document.querySelector('ion-alert input');
      firstInput.focus();
    }, 250);
  }
}

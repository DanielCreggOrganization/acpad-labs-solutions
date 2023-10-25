import { Component, ViewChild } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { TasksService, Task } from '../../services/tasks.service';
import {
  CheckboxCustomEvent,
  IonModal,
  IonRouterOutlet,
  LoadingController,
} from '@ionic/angular';
import { doc, updateDoc } from 'firebase/firestore';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  newTask!: Task;
  @ViewChild(IonModal) modal!: IonModal;
  presentingElement: HTMLIonRouterOutletElement;
  tasks = this.tasksService.readTasks();
  fileToUpload?: File;

  constructor(
    private authService: AuthService,
    private router: Router,
    private tasksService: TasksService,
    private loadingController: LoadingController,
    private routerOutlet: IonRouterOutlet
  ) {
    this.presentingElement = routerOutlet.nativeEl;
    this.resetTask();
  }

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

  deleteTask(task: Task) {
    // Print task to console
    console.log("Deleting task: ", task);
    this.tasksService.deleteTask(task);
  }

  // This method is used to update the checkbox in the UI when the user toggles the checkbox
  async toggleTask(ionCheckboxEvent: Event, task: Task) {
    task.completed = (ionCheckboxEvent as CheckboxCustomEvent).detail.checked;
    await this.tasksService.toggleTaskCompleted(task);
  }

  async openUpdateModal(task: Task) {
    this.newTask = { ...task }; // copy the task to newTask
    // open the modal
    await this.modal.present();
  }

  async updateTask() {
    await this.tasksService.updateTask(this.newTask);
    await this.modal.dismiss();
    this.resetTask();
  }

}

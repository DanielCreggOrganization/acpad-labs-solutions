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

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  newTask!: Task;
  @ViewChild(IonModal) modal!: IonModal;
  presentingElement: HTMLIonRouterOutletElement;
  tasks = this.tasksService.getTasks();
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
    this.authService.logout();
    this.router.navigateByUrl('/', { replaceUrl: true });
  }

  cancel() {
    this.modal.dismiss(null, 'cancel');
    this.resetTask();
  }

  resetTask() {
    this.newTask = {
      title: '',
      completed: false,
    };
  }

  async addTask() {
    const loading = await this.loadingController.create();
    // await means that the code will wait for the loading to be presented before continuing
    await loading.present();

    // Upload the file if there is one. If there is no file, the file property will be undefined.
    if (this.fileToUpload) {
      this.newTask.file = await this.tasksService.uploadFile(this.fileToUpload);
    }
    // Add the task to the database
    this.tasksService.addTask(this.newTask);
    await loading.dismiss();
    this.modal.dismiss(null, 'confirm');
    this.resetTask();
  }

  deleteTask(task: Task) {
    this.tasksService.deleteTask(task);
  }

  async toggleTask(ionCheckboxEvent: Event, task: Task) {
    task.completed = (ionCheckboxEvent as CheckboxCustomEvent).detail.checked;
    await this.tasksService.updateTask(task);
  }

  addFileToTask(event: any) {
    // Get the file from the event
    console.log(event.target.firstChild.files);
    // Get the file. The file is the first item in the files property
    this.fileToUpload = event.target.firstChild.files[0];
  }
  
}

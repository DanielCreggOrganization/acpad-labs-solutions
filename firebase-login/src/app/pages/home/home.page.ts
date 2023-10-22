import { Component, ViewChild } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { TasksService, Task } from 'src/app/services/tasks.service';
import { LoadingController, IonRouterOutlet, IonModal } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  // Exclaimation mark means that the variable will be initialized later.
  newTask!: Task;
  // Access the modal using the @ViewChild decorator. ViewChild is used to access a child component, directive or a DOM element.
  @ViewChild(IonModal) modal!: IonModal;
  presentingElement: HTMLIonRouterOutletElement;
  //tasks = this.tasksService.getTasks();
  fileToUpload?: File;

  constructor(
    private authService: AuthService,
    private router: Router,
    private tasksService : TasksService,
    private loadingController: LoadingController,
    private routerOutlet: IonRouterOutlet
  ) {
    this.presentingElement = this.routerOutlet.nativeEl;
    this.resetTask();
  }

  async addTask() {
    const loading = await this.loadingController.create();
    await loading.present();

    this.tasksService.addTask(this.newTask);
    await loading.dismiss();
    this.modal.dismiss(null, 'confirm');
    this.resetTask();
  }

  // cancel the modal and reset the newTask object.
  cancel() {
    this.modal.dismiss(null, 'cancel');
    this.resetTask();
  }

  // reset the newTask object to its initial state.
  resetTask() {
    this.newTask = {
      title: '',
      completed: false,
    };
  }

  async logout() {
    this.authService.logout();
    // When logout, redirect to login page.
    // Replace the current page in the history stack so that the user won't be able to go back to the home page after logout.
    this.router.navigateByUrl('/', { replaceUrl: true });
  }
}

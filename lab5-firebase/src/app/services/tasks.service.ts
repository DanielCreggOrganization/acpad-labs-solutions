import { Injectable } from '@angular/core';
import { Auth, onAuthStateChanged } from '@angular/fire/auth'; // Used to get the current user and subscribe to the auth state.
import {
  addDoc, // Used to add a document to Firestore.
  collection, // Used to create a reference to a collection in Firestore.
  collectionData, // Used to create an observable that will emit the current value of the tasks array.
  CollectionReference, // Used to create a reference to a collection in Firestore.
  deleteDoc, // Used to delete a document in Firestore.
  doc, // Used to get a reference to a document in Firestore.
  Firestore, // Used to interact with Firestore.
  query, // Used to create a query to get the tasks for the current user.
  updateDoc, // Used to update a document in Firestore.
  where, // Used to create a query to get the tasks for the current user.
} from '@angular/fire/firestore'; // Import the functions needed to interact with Firestore.
import { BehaviorSubject, Observable, Subscription } from 'rxjs'; // Used to create an observable that will emit the current value of the tasks array.

// Task is an interface that defines the structure of a task. The ? after the property name means that the property is optional.
export interface Task {
  id?: string; // The id is optional because Firestore does not store the id in the document.
  content: string;
  completed: boolean;
  file?: string;
  user?: string;
}
// The @Injectable decorator is used to make the service injectable. The service is injected into the constructor.
// The providedIn option is used to specify that the service should be provided in the root injector (AppModule).
// This means that the service will be available to the entire application.
@Injectable({
  providedIn: 'root',
})
export class TasksService {
  // Create a reference to the tasks collection. This is a reference to the collection in Firestore.
  private collectionRef: CollectionReference;
  // Create a BehaviorSubject to store the tasks. This is an observable that will emit the current value of the tasks array.
  private tasks: BehaviorSubject<Task[]> = new BehaviorSubject<Task[]>([]);
  // Create a subscription to the tasks collection. This is a subscription to the collection in Firestore.
  private tasksSub!: Subscription;

  constructor(
    private firestore: Firestore, // Inject the Firestore service.
    private auth: Auth // Inject the Auth service.
  ) {
    // Create a reference to the tasks collection. This is a reference to the collection in Firestore.
    this.collectionRef = collection(this.firestore, 'tasks');

    // Subscribe to the auth state.
    this.subscribeToAuthState();
  }

  /**
   * Subscribes to the authentication state of the application.
   * This method is called when the authentication state changes (i.e., when a user logs in or out).
   * If a user is logged in, it subscribes to the tasks of the logged-in user by calling `subscribeToTasks`.
   * If no user is logged in, it unsubscribes from the tasks by calling `unsubscribeFromTasks`.
   */
  private subscribeToAuthState(): void {
    onAuthStateChanged(this.auth, (user) => {
      if (user) {
        // If a user is logged in, subscribe to their tasks.
        this.subscribeToTasks(user.uid);
      } else {
        // If no user is logged in, unsubscribe from tasks.
        this.unsubscribeFromTasks();
      }
    });
  }

  private subscribeToTasks(userId: string): void {
    // Create a query to get the tasks for the current user.
    const tasksQuery = query(this.collectionRef, where('user', '==', userId));

    // Subscribe to the tasks collection.
    const collectionSub = collectionData(tasksQuery, {
      idField: 'id',
    }) as Observable<Task[]>;

    // Update the tasks BehaviorSubject with the new tasks.
    this.tasksSub = collectionSub.subscribe((tasks) => {
      this.tasks.next(tasks);
    });
  }

  private unsubscribeFromTasks(): void {
    // If there is no user, unsubscribe from the tasks collection and clear the tasks BehaviorSubject.
    this.tasks.next([]);
    if (this.tasksSub) {
      this.tasksSub.unsubscribe();
    }
  }

  // Create a task and add it to the tasks collection. This will add a document to the collection on Firestore.
  async createTask(task: Task) {
    try {
      await addDoc(this.collectionRef, {
        ...task,
        user: this.auth.currentUser?.uid,
      });
    } catch (error) {
      console.error('Error creating task:', error);
    }
  }

  // Return the tasks BehaviorSubject as an observable. This will allow us to subscribe to the tasks array.
  // The async keyword is not needed here because this method is not dealing with Promises
  readTasks() {
    return this.tasks.asObservable();
  }

  updateTask(task: Task) {
    // Use the task id to get the reference to the document
    const ref = doc(this.firestore, `tasks/${task.id}`);
    // Update the document. Here we set the value of the content field to the value of the task.content
    return updateDoc(ref, { content: task.content });
  }

  async deleteTask(task: Task) {
    try {
      // Use the task id to get the reference to the document
      const ref = doc(this.firestore, `tasks/${task.id}`);
      // Delete the document
      await deleteDoc(ref);
    } catch (error) {
      // Log the error to the console
      console.error('Error deleting document: ', error);
    }
  }

  // This method is used update the checkbox in the Firestore database when the user toggles the checkbox in the UI.
  async toggleTaskCompleted(task: Task) {
    try {
      // Use the task id to get the reference to the document
      const ref = doc(this.firestore, `tasks/${task.id}`);
      // Update the document. Here we set the value of the completed field to the value of the task.completed
      return updateDoc(ref, { completed: task.completed });
    } catch (error) {
      console.error('Error updating task:', error);
    }
  }
}

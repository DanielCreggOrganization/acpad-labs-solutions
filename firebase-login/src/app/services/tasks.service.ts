import { Injectable } from '@angular/core';
import { Auth, onAuthStateChanged } from '@angular/fire/auth';
import {
  addDoc,
  collection,
  collectionChanges,
  collectionData,
  CollectionReference,
  deleteDoc,
  doc,
  Firestore,
  query,
  updateDoc,
  where,
} from '@angular/fire/firestore';
import {
  getDownloadURL,
  ref,
  Storage,
  uploadBytes,
} from '@angular/fire/storage';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';

export interface Task {
  id?: string;
  content: string;
  completed: boolean;
  file?: string;
  user?: string;
}

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
    private firestore: Firestore,
    private auth: Auth,
    private storage: Storage
  ) {
    // Create a reference to the tasks collection. This is a reference to the collection in Firestore.
    this.collectionRef = collection(this.firestore, 'tasks');
    // Subscribe to the auth state. This will run whenever the user logs in or out.
    onAuthStateChanged(this.auth, (user) => {
      if (user) {
        // Create a query to get the tasks for the current user.
        const tasksQuery = query(
          this.collectionRef,
          where('user', '==', user.uid)
        );
        // Subscribe to the tasks collection. This will run whenever the tasks collection changes.
        const collectionSub = collectionData(tasksQuery, {
          idField: 'id',
        }) as Observable<Task[]>;
        // Update the tasks BehaviorSubject with the new tasks.
        this.tasksSub = collectionSub.subscribe((tasks) => {
          this.tasks.next(tasks);
        });
      } else {
        // If there is no user, unsubscribe from the tasks collection and clear the tasks BehaviorSubject.
        this.tasks.next([]);
        this.tasksSub.unsubscribe();
      }
    });
  }

  // Create a task and add it to the tasks collection. This will add a document to the collection on Firestore.
  async createTask(task: Task) {
    addDoc(this.collectionRef, { ...task, user: this.auth.currentUser?.uid });
  }

  // Return the tasks BehaviorSubject as an observable. This will allow us to subscribe to the tasks array.
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
    // Use the task id to get the reference to the document
    const ref = doc(this.firestore, `tasks/${task.id}`);
    // Update the document. Here we set the value of the completed field to the value of the task.completed
    return updateDoc(ref, { completed: task.completed });
  }

}

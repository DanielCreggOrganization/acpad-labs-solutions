import { Injectable } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import {
  Firestore,
  addDoc,
  CollectionReference,
  collection,
} from '@angular/fire/firestore';
import { Storage } from '@angular/fire/storage';

// Create a new interface for Tasks. This will be the structure of our tasks.
export interface Task {
  id?: string; // The ? means that this is an optional property.
  title: string;
  completed: boolean;
  file?: string;
  user?: string;
}

@Injectable({
  providedIn: 'root',
})
export class TasksService {
  private collectionRef: CollectionReference;

  constructor(
    private auth: Auth,
    private firestore: Firestore,
    private storage: Storage
  ) {
    this.collectionRef = collection(firestore, 'tasks');
  } // End of constructor

  // Create addTask method to add a new task to the database.
  addTask(task: Task) {
    // If the task has a file, upload it to the storage. If not, just add the task to the database.
    // The ? means that this is an optional property.
    addDoc(this.collectionRef, { ...task, user: this.auth.currentUser?.uid });
  }
} // End of class

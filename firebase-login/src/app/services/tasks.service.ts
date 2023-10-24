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
  private tasks: BehaviorSubject<Task[]> = new BehaviorSubject<Task[]>([]);
  private tasksSub!: Subscription;

  constructor(
    private firestore: Firestore,
    private auth: Auth,
    private storage: Storage
  ) {
    this.collectionRef = collection(this.firestore, 'tasks');
    onAuthStateChanged(this.auth, (user) => {
      if (user) {
        const tasksQuery = query(
          this.collectionRef,
          where('user', '==', user.uid)
        );
        const collectionSub = collectionData(tasksQuery, {
          idField: 'id',
        }) as Observable<Task[]>;
        this.tasksSub = collectionSub.subscribe((tasks) => {
          this.tasks.next(tasks);
        });
      } else {
        this.tasks.next([]);
        this.tasksSub.unsubscribe();
      }
    });
  }

  addTask(task: Task) {
    addDoc(this.collectionRef, { ...task, user: this.auth.currentUser?.uid });
  }

  getTasks() {
    return this.tasks.asObservable();
  }

  updateTask(task: Task) {
    // Use the task id to get the reference to the document
    const ref = doc(this.firestore, `tasks/${task.id}`);
    // Update the document. Here we set the value of the completed field to the value of the task.completed
    return updateDoc(ref, { completed: task.completed });
  }

  deleteTask(task: Task) {
    // Use the task id to get the reference to the document
    const ref = doc(this.firestore, `tasks/${task.id}`);
    // Delete the document
    return deleteDoc(ref);
  }

  // Upload a file to the cloud. Returns the download URL of the file.
  async uploadFile(fileToUpload: File) {
    // Create a reference to the file to save
    const storageRef = ref(
      this.storage,
      `files/${this.auth.currentUser?.uid}/${fileToUpload.name}`
    );
    // Upload the file to the cloud
    await uploadBytes(storageRef, fileToUpload);
    // Get the download URL of the file
    return getDownloadURL(storageRef);
  }
}

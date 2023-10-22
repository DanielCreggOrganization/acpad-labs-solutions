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
    const ref = doc(this.firestore, `tasks/${task.id}`);
    return updateDoc(ref, { completed: task.completed });
  }

  deleteTask(task: Task) {
    const ref = doc(this.firestore, `tasks/${task.id}`);
    return deleteDoc(ref);
  }

  async uploadFile(fileToUpload: File) {
    const storageRef = ref(
      this.storage,
      `files/${this.auth.currentUser?.uid}/${fileToUpload.name}`
    );

    await uploadBytes(storageRef, fileToUpload);

    return getDownloadURL(storageRef);
  }
}

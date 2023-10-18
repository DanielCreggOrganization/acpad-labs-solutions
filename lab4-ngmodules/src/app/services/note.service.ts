// note.service.ts
import { Injectable } from '@angular/core';
// Here we are importing the BehaviorSubject from rxjs. 
// This is necessary because we will be using a BehaviorSubject
// to store the notes. rxjs is a library that provides a number
// of useful features for dealing with asynchronous code.
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NoteService {
  // Here we are using a BehaviorSubject to store the notes.
  // BehaviorSubjects are a type of Subject that always returns
  // the most recent value. This is necessary because we want
  // the component to be able to access the notes array without
  private _notes = new BehaviorSubject<string[]>([]);

  get notes() {
    // Here we are using the asObservable() method to return an
    // Observable that the component can subscribe to. This is
    // necessary because we don't want the component to be able
    // to call next() on the BehaviorSubject.
    return this._notes.asObservable();
  }

  addNote(note: string) {
    // Here we are using the spread operator to create a new array. 
    // This is necessary because we want to create a new array and 
    // not just add to the existing array.
    this._notes.next([...this._notes.getValue(), note]);
  }
}
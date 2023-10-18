import { Component } from '@angular/core';
import { NoteService } from '../services/note.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-notes',
  templateUrl: './notes.page.html',
  styleUrls: ['./notes.page.scss'],
})
export class NotesPage {
  notes: Observable<string[]>;
  newNote = ''; // Initialize newNote property

  constructor(private noteService: NoteService) {
    this.notes = this.noteService.notes;
  }

  addNote() {
    this.noteService.addNote(this.newNote);
    this.newNote = '';
  }
}

import { Component, OnInit } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { DbService } from "../services/db.service";

@Component({
  selector: "app-notes",
  templateUrl: "./notes.component.html",
  styleUrls: ["./notes.component.css"]
})
export class NotesComponent implements OnInit {
  newNoteTitle = "";
  newNotePinned = false;
  newNoteContent = "";
  resultNotes;
  editing: boolean[] = [];
  visible: boolean = false;
  editNoteTitle = "";
  editNoteContent = "";
  constructor(private dbService: DbService, private http: HttpClient) {}

  addNote() {
    // post note
    this.dbService
      .addNote({
        title: this.newNoteTitle,
        pinned: this.newNotePinned,
        content: this.newNoteContent,
        userId: 42
      })
      .subscribe(() => {
        this.getNotes();
      });
  }
  getNotes() {
    this.resultNotes = [];
    this.dbService.getNotes().subscribe(data => {
      this.resultNotes = data;
      for (let note of this.resultNotes) {
        this.editing.push(false);
      }
      console.log(data);
      console.log(this.resultNotes);
    });
  }

  deleteNote(noteId: number) {
    this.dbService.deleteNote(noteId).subscribe(() => {
      this.getNotes();
    });
  }

  editNote(note) {
    this.dbService
      .editNote({
        title: this.editNoteTitle,
        pinned: this.newNotePinned,
        content: this.editNoteContent,
        userId: 42
      })
      .subscribe(() => {
        // this.newNoteTitle = note.title;
        // this.newNoteContent = note.content;
        // this.newNotePinned = note.pinned;
        this.getNotes();
      });
  }
  appear() {
    console.log("you clicked");
    this.visible = !this.visible;
    console.log(this.visible);
  }
  ngOnInit() {
    this.getNotes();
  }
}

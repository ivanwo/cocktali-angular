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
  editNotePinned: boolean = this.newNotePinned;
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
      //add pinned notes to the top
      this.resultNotes.sort((a, b) => a.pinned - b.pinned);
      this.resultNotes.reverse();
    });
  }
  sort() {
    // this.resultNotes.sort((a, b) => a.title < b.title);
    // alert("changed");

    this.resultNotes.sort((a, b) => a.pinned - b.pinned);
    // this.resultNotes.reverse();
  }

  deleteNote(noteId: number) {
    this.dbService.deleteNote(noteId).subscribe(() => {
      this.getNotes();
    });
  }

  editNote(i, id) {
    console.log(this.editNoteTitle);
    this.editing[i] = false;
    this.dbService
      .editNote({
        title: this.editNoteTitle,
        pinned: this.editNotePinned,
        id: id,
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

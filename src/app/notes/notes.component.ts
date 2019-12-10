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
      console.log(data);
      console.log(this.resultNotes);
    });
  }

  deleteNote(noteId: number) {
    this.dbService.deleteNote(noteId).subscribe(data => {});
  }

  editNote(note) {
    this.dbService.editNote(note).subscribe(() => {
      this.getNotes();
    });
  }
  ngOnInit() {
    this.getNotes();
  }
}

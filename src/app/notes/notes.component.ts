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
  //
  loggedIn: boolean = false;
  userName: string = "";
  userId: number = 0;
  //
  newNoteTitle = "";
  sortMethod = "";
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
        userId: this.userId
      })
      .subscribe(() => {
        this.getNotes();
      });
  }
  getNotes() {
    this.resultNotes = [];
    this.dbService.getNotes(this.userId).subscribe(data => {
      this.resultNotes = data;
      for (let note of this.resultNotes) {
        this.editing.push(false);
      }
      console.log(data);
      // console.log(this.resultNotes);
      //add pinned notes to the top
      this.resultNotes.sort((a, b) => a.pinned - b.pinned);
      this.resultNotes.reverse();
    });
  }
  sort() {
    // this.resultNotes.sort((a, b) => a.title < b.title);
    // alert("changed");
    if (this.sortMethod === "chrono") {
      console.log("sorting by chrono");
      // this.resultNotes.sort((a, b) => {
      //   return a.id - b.id;
      // });
      //
    } else if (this.sortMethod === "alpha") {
      //
      console.log("sorting by alpha");

      this.resultNotes.sort((a, b) => {
        let aTitle = a.title.toLowerCase();
        let bTitle = b.title.toLowerCase();
        return aTitle < bTitle ? -1 : aTitle > bTitle ? 1 : 0;
      });
      // for (let i = 0; i < this.resultNotes.length; i++) {
      //   console.log(this.resultNotes);
      //   if (this.resultNotes[i].pinned) {
      //     console.log(i + " pinned");
      //     this.resultNotes.splice(1, 0, this.resultNotes[i]);
      //     this.resultNotes.splice(this.resultNotes[i - 1], 1);
      //   }
      // }
      // this.resultNotes.sort((a, b) => b.pinned - a.pinned);
      // this.resultNotes.reverse();
    } else {
      // alert("how did you get here??");
    }

    // this.resultNotes.reverse();
  }

  deleteNote(noteId: number) {
    this.dbService.deleteNote(noteId).subscribe(() => {
      this.getNotes();
    });
  }
  edit(i) {
    this.editing[i] = true;
    this.editNoteContent = this.resultNotes[i].content;
    this.editNotePinned = this.resultNotes[i].pinned;
    this.editNoteTitle = this.resultNotes[i].title;
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
    if (!this.loggedIn) {
      // alert("you must be logged in to make notes");
    } else {
      console.log("you clicked");
      this.visible = !this.visible;
      console.log(this.visible);
    }
  }
  ngOnInit() {
    // let user = this.dbService.getUser();
    let user = { loggedIn: true, userId: 1, userName: "test" };
    if (user.loggedIn) {
      this.loggedIn = user.loggedIn;
      this.userId = user.userId;
      this.userName = user.userName;
    }
    this.getNotes();
  }
}

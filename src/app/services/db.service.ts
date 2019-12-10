import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class DbService {
  BASE_URL = "http://localhost:3000";
  userId: number = 42;
  userName: string = "n/a";
  loggedIn: boolean = false;

  constructor(private http: HttpClient) {}

  getNotes() {
    //TODO: GET NOTES
    return this.http.get(this.BASE_URL + "/notes");
  }
  addNote(note) {
    //TODO: ADD NOTE
    return this.http.post(this.BASE_URL + "/notes", note);
    // maybe that will work lol
  }
  deleteNote(noteId) {
    //TODO: DELETE NOTE
    return this.http.delete(this.BASE_URL + "/notes/" + noteId);
  }
  editNote(noteId) {
    //TODO: EDIT NOTE
    return this.http.put(this.BASE_URL + "/notes/", noteId);
  }

  //
  //  FAVORITES SECTIONS, NOT SURE IF IT WILL WORK AS IS
  //  -IVAN
  //
  //
  getFavs(userId) {
    return this.http.get(this.BASE_URL + "/favs");
    // once log in system is implemented,
    // add filter send user Id to only get favs from that user
  }
  addFav(cocktailId) {
    // console.log("saving " + cocktailId + " at DbService ");
    return this.http.post(this.BASE_URL + "/favs", {
      cocktailId: cocktailId,
      userId: this.userId
    });
  }
  deleteFav(savedId) {
    // console.log(savedId);
    return this.http.delete(this.BASE_URL + "/favs/" + savedId);
  }

  //
  //  LOG IN/ SIGN UP SECTION
  //  STRETCH GOAL -IVAN
  //
  login(email: string, password: string) {
    // to do: specify what it returns above
    let body = { email: email, password: password };
    return this.http.post(`${this.BASE_URL}/login`, body);
  }
}

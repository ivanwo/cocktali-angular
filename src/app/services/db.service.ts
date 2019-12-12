import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class DbService {
  BASE_URL = "http://localhost:3000";
  userId: number = 0;
  userName: string = "";
  loggedIn: boolean = false;

  constructor(private http: HttpClient) {}

  getNotes(userId) {
    //TODO: GET NOTES
    return this.http.get(this.BASE_URL + "/notes/" + userId);
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
  editNote(note) {
    //TODO: EDIT NOTE
    // console.log(note);
    return this.http.put(this.BASE_URL + "/notes/" + note.id, note);
  }

  //
  //  FAVORITES SECTIONS, should be working for now
  //  -IVAN
  //
  //
  getFavs(userId) {
    return this.http.get(this.BASE_URL + "/favs/" + userId);
    // once log in system is implemented,
    // add filter send user Id to only get favs from that user
  }
  addFav(cocktailId, userId) {
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
    //
    //  TODO: ON LOGIN SET LOCALSTORAGE DATA
    //  localStorage.getItem();
    //
  }
  signUp(newUser) {
    return this.http.post(`${this.BASE_URL}/signup`, { newUser });
    //
    //  TODO: ON LOGIN SET LOCALSTORAGE DATA
    //  localStorage.getItem();
    //
    //
  }
  setUser(userName: string, userId: number, loggedIn: boolean) {
    this.userName = userName;
    this.userId = userId;
    this.loggedIn = loggedIn;
  }
  getUser() {
    //
    //  TODO: add localStorage to track recent login,
    //  {loggedInTime: date(), loggedInName: this.userName, loggedInId: this.userId }
    //  NOTE: DON'T SAVE PASSWORD TO LOCALSTORAGE
    //
    //  if( login within 24 hours, don't prompt for login info)
    //  else if (login outside 24 hours, delete localStorage and prompt user to login)
    //
    return {
      userId: this.userId,
      userName: this.userName,
      loggedIn: this.loggedIn
    };
  }
}

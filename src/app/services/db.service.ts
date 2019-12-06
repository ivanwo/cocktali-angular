import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class DbService {
  BASE_URL = "http://localhost:3000";

  constructor(private http: HttpClient) {}

  getNotes() {
    //TODO: GET NOTES
    return this.http.get(this.BASE_URL + "/notes");
  }
  addNote() {
    //TODO: ADD NOTE
  }
  deleteNote() {
    //TODO: DELETE NOTE
  }
  editNote() {
    //TODO: DELETE NOTE
  }
  //LOG IN IS NOW A STRETCH GOAL
  // login(email:string, password:string){
  //   // to do: specify what it returns above
  //   return this.http.get(`https://localhost:3000/login`, {email: email, password: password});
  // }
}

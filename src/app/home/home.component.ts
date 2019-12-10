import { Component, OnInit } from "@angular/core";
import { DbService } from "../services/db.service";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.css"]
})
export class HomeComponent implements OnInit {
  loggedIn: boolean = false;
  userName: string = "";
  userId: number = 0;

  constructor(private dbService: DbService) {}

  ngOnInit() {
    let user = this.dbService.getUser();
    console.log(user);
    if (user.loggedIn) {
      this.loggedIn = user.loggedIn;
      this.userId = user.userId;
      this.userName = user.userName;
    }
  }
}

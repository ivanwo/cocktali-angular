import { Component } from "@angular/core";
import { Subscription } from "rxjs";
import { DbService } from "./services/db.service";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent {
  title = "cocktali";
  loggedIn: boolean = false;
  userName: string = "n/a";
  user = { userName: "log in/ sign up", userId: 0 };
  subscription: Subscription;

  constructor(private dbService: DbService) {
    this.subscription = this.dbService.newGetUser().subscribe(message => {
      if (message) {
        console.log(message);
        this.loggedIn = true;
        this.user = message;
      } else {
        this.user = { userId: 0, userName: "log in/ sign up" };
        this.loggedIn = false;
      }
    });
  }

  ngOnInit() {}
  
  ngOnDestroy(){
    this.subscription.unsubscribe();
  }
}

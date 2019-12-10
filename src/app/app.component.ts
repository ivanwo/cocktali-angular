import { Component } from "@angular/core";
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

  constructor(private dbService: DbService) {}

  ngOnInit() {
  }
}

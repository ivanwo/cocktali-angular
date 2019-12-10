import { Component, OnInit } from "@angular/core";
import { DbService } from "../services/db.service";

@Component({
  selector: "app-sign-up-in",
  templateUrl: "./sign-up-in.component.html",
  styleUrls: ["./sign-up-in.component.css"]
})
export class SignUpInComponent implements OnInit {
  signIn: number = 0;
  userPassword = "ivanpassword";
  userEmail = "ivan@ivan.me";
  userName = "n/a";
  userId = 0;
  constructor(private dbService: DbService) {}

  signMeIn() {
    //TODO: call service to sign in
    this.dbService.login(this.userEmail, this.userPassword).subscribe(data => {
      if (data === null) {
        alert("failure to log in");
      } else {
        // right now this just assumes the signin was successful

        this.userName = data[0].name;
        this.userId = data[0].id;
        this.signIn = 3;
        // this.routes.navigate(["./"]);
        console.log(this.userName + " : " + this.userId);
        this.dbService.loggedIn = true;
      }
    });
  }
  signMeUp() {
    //TODO: call service to sign up
  }

  ngOnInit() {}
}

import { Component, OnInit } from "@angular/core";
import { DbService } from "../services/db.service";

@Component({
  selector: "app-sign-up-in",
  templateUrl: "./sign-up-in.component.html",
  styleUrls: ["./sign-up-in.component.css"]
})
export class SignUpInComponent implements OnInit {
  signIn: number = 0;
  userPassword = "";
  userEmail = "";
  userName = "n/a";
  newUserName = "";
  newUserEmail = "";
  acctExists: boolean = false;
  newUserPassword = "";
  userId = 0;
  loggedIn: boolean = false;
  signInFail: boolean = false;
  signUpSuccess: boolean = false;

  constructor(private dbService: DbService) {}

  signMeIn() {
    //TODO: call service to sign in
    this.dbService.login(this.userEmail, this.userPassword).subscribe(data => {
      if (data === null) {
        // alert("failure to log in");
        this.signInFail = true;
      } else {
        // right now this just assumes the signin was successful
        this.signInFail = false;
        this.userName = data[0].name;
        this.userId = data[0].id;
        this.signIn = 3;
        this.loggedIn = true;
        console.log(this.userName + " : " + this.userId);
        this.dbService.setUser(this.userName, this.userId, this.loggedIn);
      }
    });
  }
  signMeUp() {
    //TODO: call service to sign up
    this.acctExists = false;
    let newUser = {
      name: this.newUserName,
      email: this.newUserEmail,
      password: this.newUserPassword
    };
    this.dbService.signUp(newUser).subscribe(data => {
      console.log(data);
      this.signIn = 3;
      this.userName = this.newUserName;
      this.userPassword = this.newUserPassword;
      this.userEmail = this.newUserEmail;
      this.acctExists = false;
      this.signUpSuccess = true;
      this.signMeIn();
    });
  }

  ngOnInit() {
    let user = this.dbService.getUser();
    if (user.loggedIn) {
      this.loggedIn = true;
      this.userId = user.userId;
      this.userName = user.userName;
    }
  }
}

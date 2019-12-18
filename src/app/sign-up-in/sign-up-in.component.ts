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
  signUpFail: boolean = false;

  //
  favList;
  numFavs = 0;
  numNotes = 0;

  constructor(private dbService: DbService) {}

  signMeIn() {
    //TODO: call service to sign in
    if (this.userEmail !== "" && this.userPassword !== "") {
      this.dbService
        .login(this.userEmail, this.userPassword)
        .subscribe(data => {
          if (data === null) {
            // alert("failure to log in");
            this.signInFail = true;
          } else {
            // right now this just assumes the signin was successful
            this.signInFail = false;
            this.signUpFail = false;
            this.userName = data[0].name;
            this.userId = data[0].id;
            this.signIn = 3;
            this.loggedIn = true;
            console.log(this.userName + " : " + this.userId);
            this.dbService.setUser(
              this.userName,
              this.userId,
              this.loggedIn,
              this.userEmail
            );
            //
            // sendUser sends the user object to the main app component
            //
            this.dbService.sendUser({
              userName: this.userName,
              userId: this.userId,
              loggedIn: this.loggedIn,
              userEmail: ""
            });
            this.getStuff();
          }
        });
    } else {
      this.signInFail = true;
    }
  }
  signMeUp() {
    //TODO: call service to sign up
    this.acctExists = false;
    // basically, only even try to make an account if they've actually filled out the form
    if (
      this.newUserEmail !== "" &&
      this.newUserName !== "" &&
      this.newUserPassword !== ""
    ) {
      let newUser = {
        name: this.newUserName,
        email: this.newUserEmail,
        password: this.newUserPassword
      };
      this.dbService.signUp(newUser).subscribe(data => {
        console.log(data);
        this.signIn = 3;
        this.signUpFail = false;
        this.userName = this.newUserName;
        this.userPassword = this.newUserPassword;
        this.userEmail = this.newUserEmail;
        this.acctExists = false;
        this.signUpSuccess = true;
        this.signMeIn();
      });
    } else {
      //
      this.signUpFail = true;
      //
    }
  }
  getStuff() {
    this.dbService.getFavs(this.userId).subscribe(data => {
      this.favList = data;
      // if(data.drinks ===null)
      if (data === null) {
        this.numFavs = 0;
      } else {
        this.numFavs = this.favList.length;
      }
      // console.log(this.numFavs);
    });
    this.dbService.getNotes(this.userId).subscribe(data => {
      this.favList = data;
      if (data === null) {
        this.numNotes = 0;
      } else {
        this.numNotes = this.favList.length;
      }
      // console.log(this.numNotes);
    });
  }
  logOut() {
    this.dbService.sendUser({
      userName: "Log In/ Sign Up",
      userId: 0,
      loggedIn: false,
      userEmail: ""
    });
    this.dbService.setUser("Log In/ Sign Up", 0, false, "");
  }

  ngOnInit() {
    let user = this.dbService.getUser();
    // let user = {
    //   userName: "ivan",
    //   userId: 1,
    //   loggedIn: true,
    //   userEmail: "ivan@ivan.me"
    // };
    if (user.loggedIn) {
      this.loggedIn = true;
      this.userId = user.userId;
      this.userName = user.userName;
      this.userEmail = user.userEmail;
      this.getStuff();
    }
  }
}

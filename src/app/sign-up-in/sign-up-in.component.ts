import { Component, OnInit } from "@angular/core";
import { DbService } from "../services/db.service";

@Component({
  selector: "app-sign-up-in",
  templateUrl: "./sign-up-in.component.html",
  styleUrls: ["./sign-up-in.component.css"]
})
export class SignUpInComponent implements OnInit {
  signIn: boolean = true;
  constructor(private dbService: DbService) {}

  signMeIn() {
    //TODO: call service to sign in
  }
  signMeUp() {
    //TODO: call service to sign up
  }

  ngOnInit() {}
}

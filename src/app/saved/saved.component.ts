import { Component, OnInit } from "@angular/core";
import { DbService } from "../services/db.service";

@Component({
  selector: "app-saved",
  templateUrl: "./saved.component.html",
  styleUrls: ["./saved.component.css"]
})
export class SavedComponent implements OnInit {
  favList;
  userId: number = 42;

  constructor(private dbService: DbService) {}

  deleteFav(savedId) {
    this.dbService.deleteFav(savedId).subscribe(data => {
      this.getFavs();
    });
  }
  getFavs() {
    this.favList = [];
    this.dbService.getFavs(this.userId).subscribe(data => {
      this.favList = data;
      for (let fav of this.favList) {
        console.log(fav);
      }
    });
  }

  ngOnInit() {
    this.getFavs();
  }
}

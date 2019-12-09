import { Component, OnInit } from "@angular/core";
<<<<<<< Updated upstream
import { DbService } from "../services/db.service";
=======
>>>>>>> Stashed changes

@Component({
  selector: "app-saved",
  templateUrl: "./saved.component.html",
  styleUrls: ["./saved.component.css"]
})
export class SavedComponent implements OnInit {
<<<<<<< Updated upstream
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
=======
  constructor() {}

  ngOnInit() {}
>>>>>>> Stashed changes
}

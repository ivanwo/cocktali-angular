import { Component, OnInit } from "@angular/core";
import { DbService } from "../services/db.service";
import { CocktailAPIService } from "../services/cocktail-api.service";

@Component({
  selector: "app-saved",
  templateUrl: "./saved.component.html",
  styleUrls: ["./saved.component.css"]
})
export class SavedComponent implements OnInit {
  loggedIn: boolean = false;
  userName: string = "";
  userId: number = 0;
  message: string = "Your Saved";

  favList;
  favContents = [];

  constructor(
    private dbService: DbService,
    private apiService: CocktailAPIService
  ) {}

  deleteFav(savedId) {
    this.dbService.deleteFav(savedId).subscribe(data => {
      this.getFavs();
    });
  }
  getFavs() {
    this.favList = [];
    this.favContents = [];
    if (!this.loggedIn) {
      // alert("you must log in to save cocktails");
      this.message = "You must Log in to Save Cocktails";
    } else {
      this.message = "Your Saved Cocktails";
      this.dbService.getFavs(this.userId).subscribe(datum => {
        this.favList = datum;
        if (this.favList.length === 0) {
          this.message = "You have no Saved Cocktails";
        }
        // console.log(this.favList);
        for (let fav of this.favList) {
          // console.log(fav);
          if (fav.cocktailid !== null) {
            this.apiService.searchById(fav.cocktailid).subscribe(data => {
              // console.log(data);
              this.favContents.push({
                name: data.drinks[0].strDrink,
                savedid: fav.savedid,
                front: false,
                img: data.drinks[0].strDrinkThumb,
                id: data.drinks[0].idDrink,
                instructions: data.drinks[0].strInstructions,
                ingredients: this.cleanIngredients(data.drinks[0])
              });
            });
          }
        }
      });
    }
  }
  flip(cocktail) {
    cocktail.front = !cocktail.front;
  }
  cleanIngredients(cocktail) {
    let ingredients: string[] = [];
    let currentIngredient: string;
    let currentMeasure: string;
    let newMeasure: string;
    let newIngredient: string;
    for (let i = 1; i < 15; i++) {
      currentIngredient = "strIngredient" + i;
      currentMeasure = "strMeasure" + i;
      if (
        cocktail[currentIngredient] !== null &&
        cocktail[currentIngredient] !== ""
      ) {
        newIngredient = cocktail[currentIngredient];
        if (cocktail[currentMeasure] === null) newMeasure = "";
        else newMeasure = " : " + cocktail[currentMeasure];
        ingredients.push(newIngredient + newMeasure);
      } else {
        break;
      }
    }
    return ingredients;
  }
  ngOnInit() {
    let user = this.dbService.getUser();
    if (user.loggedIn) {
      this.loggedIn = user.loggedIn;
      this.userId = user.userId;
      this.userName = user.userName;
    }
    this.getFavs();
  }
}

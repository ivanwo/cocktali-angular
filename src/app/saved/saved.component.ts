import { Component, OnInit } from "@angular/core";
import { DbService } from "../services/db.service";
import { CocktailAPIService } from "../services/cocktail-api.service";

@Component({
  selector: "app-saved",
  templateUrl: "./saved.component.html",
  styleUrls: ["./saved.component.css"]
})
export class SavedComponent implements OnInit {
  favList;
  userId: number = 42;
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
    this.dbService.getFavs(this.userId).subscribe(datum => {
      this.favList = datum;
      for (let fav of this.favList) {
        this.apiService.searchById(fav.cocktailid).subscribe(data => {
          this.favContents.push({
            name: data.drinks[0].strDrink,
            savedid: fav.savedid,
            img: data.drinks[0].strDrinkThumb,
            id: data.drinks[0].idDrink,
            instructions: data.drinks[0].strInstructions,
            ingredients: this.cleanIngredients(data.drinks[0])
          });
        });
      }
    });
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
    this.getFavs();
  }
}

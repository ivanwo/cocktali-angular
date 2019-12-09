import { Component, OnInit } from "@angular/core";
import { CocktailAPIService } from "../services/cocktail-api.service";

@Component({
  selector: "app-search",
  templateUrl: "./search.component.html",
  styleUrls: ["./search.component.css"]
})
export class SearchComponent implements OnInit {
  constructor(private cocktailAPIService: CocktailAPIService) {}
  searchType: string = "Name";
  searchTerm: string = "";
  searchCategory: string = "Cocktail";
  resultsList: any[];

  ngOnInit() {}

  cocktailSearch() {
    if (this.searchType === "Name") {
      // search by name
      this.resultsList = [];
      this.cocktailAPIService.searchByName(this.searchTerm).subscribe(data => {
        if (data.drinks !== null) {
          for (let cocktail of data.drinks) {
            this.resultsList.push({
              name: cocktail.strDrink,
              img: cocktail.strDrinkThumb,
              front: false,
              id: cocktail.idDrink
            });
          }
        }
      });
    } else if (this.searchType === "Ingredient") {
      let cleanSearch = this.cleanIngredient(this.searchTerm);
      this.cocktailAPIService
        .searchByIngredient(cleanSearch)
        .subscribe(data => {
          if (data.drinks !== null) {
            for (let cocktail of data.drinks) {
              this.resultsList.push({
                name: cocktail.strDrink,
                img: cocktail.strDrinkThumb,
                front: false,
                id: cocktail.idDrink
              });
            }
          }
        });
    } else if (this.searchType === "Category") {
      //search by category
      this.resultsList = [];
      this.cocktailAPIService
        .searchByCategory(this.searchCategory)
        .subscribe(data => {
          if (data.drinks !== null) {
            for (let cocktail of data.drinks) {
              this.resultsList.push({
                name: cocktail.strDrink,
                img: cocktail.strDrinkThumb,
                front: false,
                id: cocktail.idDrink
              });
            }
          }
        });
    } else {
      alert("you shouldn't have gotten here");
    }
  }
  flip(cocktail) {
    if (!cocktail.front && cocktail.instructions !== null) {
      this.cocktailAPIService.searchById(cocktail.id).subscribe(data => {
        cocktail.instructions = data.drinks[0].strInstructions;
        cocktail.ingredients = this.cleanIngredients(data.drinks[0]);
      });
    }
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

  placeHolder() {
    // TO DO: Cycle through a couple placeholders (on init?)
    return "negroni";
  }

  cleanIngredient(dirty: string): string {
    // TO DO: clean up user input to fit it to the API
    
    return "vodka";
  }
}

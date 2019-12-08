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
              instructions: cocktail.strInstructions,
              ingredients: this.cleanIngredients(cocktail),
              id: cocktail.idDrink
            });
          }
        }
      });
    } else if (this.searchType === "Ingredient") {
      let cleanSearch = this.cleanIngredientsList();
      //search by ingredient using cleanSearch
    } else if (this.searchType === "Category") {
      //search by category
      this.resultsList = [];
      this.cocktailAPIService
        .searchByCategory(this.searchCategory)
        .subscribe(data => {
          if (data.drinks !== null) {
            //
            //  NOTE: THERE IS NO INGREDIENTS LIST OR INSTRUCTIONS RETURNED FROM A CATEGORY SEARCH!
            //  you may have to run another set of searches based on the drink ID
            //
            for (let cocktail of data.drinks) {
              this.resultsList.push({
                name: cocktail.strDrink,
                instructions: cocktail.strInstructions,
                img: cocktail.strDrinkThumb,
                front: false,
                // ingredients: this.cleanIngredients(cocktail),
                id: cocktail.idDrink
              });
            }
          }
        });
    } else {
      alert("you shouldn't have gotten here");
    }
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

  cleanIngredientsList() {
    // TO DO: clean up user input to fit it to the API
  }
}

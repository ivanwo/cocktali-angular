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
    } else {
      alert("you shouldn't have gotten here");
    }
  }

  placeHolder() {
    // TO DO: Cycle through a couple placeholders (on init?)
    return "negroni";
  }

  cleanIngredientsList() {
    // TO DO: clean up user input to fit it to the API
  }
}

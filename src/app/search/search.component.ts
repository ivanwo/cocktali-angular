import { Component, OnInit } from "@angular/core";
import { CocktailAPIService } from "../services/cocktail-api.service";
import { DbService } from "../services/db.service";

@Component({
  selector: "app-search",
  templateUrl: "./search.component.html",
  styleUrls: ["./search.component.css"]
})
export class SearchComponent implements OnInit {
  constructor(
    private cocktailAPIService: CocktailAPIService,
    private dbService: DbService
  ) {}
  // login activity
  loggedIn: boolean = false;
  userName: string = "";
  userId: number = 0;
  //
  errorMsg: boolean = false;
  searchType: string = "Name";
  searchTerm: string = "";
  searchCategory: string = "Cocktail";
  resultsList: any[];
  placeHolders: string[] = [
    "negroni",
    "boulevardier",
    "martini",
    "bloody mary"
  ];
  placeHolder: string;
  noResults: boolean = false;

  cocktailSearch() {
    if (this.searchType === "Name") {
      // search by name
      this.resultsList = [];
      this.cocktailAPIService.searchByName(this.searchTerm).subscribe(data => {
        if (data.drinks === null) {
          this.noResults = true;
        } else {
          this.noResults = false;
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
      this.resultsList = [];
      let cleanSearch = this.cleanIngredient(this.searchTerm);
      this.cocktailAPIService
        .searchByIngredient(cleanSearch)
        .subscribe(data => {
          if (data.drinks === "None Found") {
            // alert("no results");
            this.noResults = true;
          } else {
            this.noResults = false;
            for (let cocktail of data.drinks) {
              this.resultsList.push({
                name: cocktail.strDrink,
                img: cocktail.strDrinkThumb,
                favorite: false,
                front: false,
                id: cocktail.idDrink
              });
            }
          }
        });
    } else if (this.searchType === "Category") {
      //search by category
      this.resultsList = [];
      if (this.searchCategory === "Non-Alcoholic") {
        this.cocktailAPIService
          .searchByNonAlcoholic(this.searchCategory)
          .subscribe(data => {
            if (data.drinks === "None Found") {
              // alert("no results");
              this.noResults = true;
            } else {
              this.noResults = false;
              for (let cocktail of data.drinks) {
                this.resultsList.push({
                  name: cocktail.strDrink,
                  img: cocktail.strDrinkThumb,
                  favorite: false,
                  front: false,
                  id: cocktail.idDrink
                });
              }
            }
          });
      } else if (this.searchCategory === "Random") {
        this.cocktailAPIService
          .searchByRandom(this.searchCategory)
          .subscribe(data => {
            if (data.drinks === "None Found") {
              // alert("no results");
              this.noResults = true;
            } else {
              this.noResults = false;
              for (let cocktail of data.drinks) {
                this.resultsList.push({
                  name: cocktail.strDrink,
                  img: cocktail.strDrinkThumb,
                  favorite: false,
                  front: false,
                  id: cocktail.idDrink
                });
              }
            }
          });
      } else {
        this.cocktailAPIService
          .searchByCategory(this.searchCategory)
          .subscribe(data => {
            if (data.drinks === "None Found") {
              // alert("no results");
              this.noResults = true;
            } else {
              this.noResults = false;
              for (let cocktail of data.drinks) {
                this.resultsList.push({
                  name: cocktail.strDrink,
                  img: cocktail.strDrinkThumb,
                  favorite: false,
                  front: false,
                  id: cocktail.idDrink
                });
              }
            }
          });
      }
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
        if (
          cocktail[currentMeasure] === null ||
          cocktail[currentMeasure] === ""
        )
          newMeasure = "";
        else newMeasure = cocktail[currentMeasure] + " ";
        ingredients.push(newMeasure + newIngredient);
      } else {
        break;
      }
    }
    return ingredients;
  }

  addFav(cocktailId) {
    // not sure this will work -ivan
    // console.log("saving " + cocktailId + " at search component");
    // PLEASE DO NOT FORGET TO SUBSCRIBE
    if (!this.loggedIn) {
      // alert("please sign up to save favorites");
      this.toggleError();
    } else {
      console.log(
        "adding fav from component " + cocktailId + " " + this.userId
      );
      this.dbService.addFav(cocktailId, this.userId).subscribe();
    }
  }
  toggleError() {
    this.errorMsg = !this.errorMsg;
  }

  ngOnInit() {
    // checks if logged in with the service
    let user = this.dbService.getUser();
    if (user.loggedIn) {
      this.loggedIn = user.loggedIn;
      this.userId = user.userId;
      this.userName = user.userName;
    }
    // picks a placeholder cocktail name from the placeHolders array and sets it on init
    let num = Math.floor(Math.random() * Math.floor(this.placeHolders.length));
    this.placeHolder = this.placeHolders[num];
    this.cocktailSearch();
  }

  cleanIngredient(dirty: string): string {
    // TO DO: clean up user input to fit it to the API
    let cleanSearch = dirty.toLowerCase();
    return cleanSearch;
  }
}

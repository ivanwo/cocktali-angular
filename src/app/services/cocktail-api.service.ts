import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

const API_KEY = 9973533;
const BASE_URL = "https://www.thecocktaildb.com/api/json/v2";

@Injectable({
  providedIn: "root"
})
export class CocktailAPIService {
  constructor(private http: HttpClient) {}

  searchById(id): Observable<any> {
    return this.http.get(`${BASE_URL}/${API_KEY}/lookup.php?`, {
      params: {
        i: id
      }
    });
  }

  searchByName(searchTerm: string): Observable<any> {
    return this.http.get(`${BASE_URL}/${API_KEY}/search.php?`, {
      params: {
        s: searchTerm
      }
    });
  }
  searchByCategory(searchTerm: string): Observable<any> {
    return this.http.get(`${BASE_URL}/${API_KEY}/filter.php?`, {
      params: {
        c: searchTerm
      }
    });
  }
  searchByRandom(searchTerm: string): Observable<any> {
    return this.http.get(`${BASE_URL}/${API_KEY}/randomselection.php`);
  }
  searchByNonAlcoholic(searchTerm: string): Observable<any> {
    return this.http.get(`${BASE_URL}/${API_KEY}/filter.php?`, {
      params: {
        a: "Non_Alcoholic"
      }
    });
  }
  searchByIngredient(searchTerm: string): Observable<any> {
    return this.http.get(`${BASE_URL}/${API_KEY}/filter.php?`, {
      params: {
        i: searchTerm
      }
    });
  }
}

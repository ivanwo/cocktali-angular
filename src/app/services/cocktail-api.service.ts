import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

const API_KEY;

@Injectable({
  providedIn: "root"
})
export class CocktailAPIService {
  constructor(private http: HttpClient) {}
}

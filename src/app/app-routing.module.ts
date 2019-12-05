import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { HomeComponent } from "./home/home.component";
import { SearchComponent } from "./search/search.component";
import { NotesComponent } from "./notes/notes.component";

const routes: Routes = [
  { path: "", component: HomeComponent },
  { path: "search", component: SearchComponent },
  { path: "notes", component: NotesComponent },
  { path: "saved", component: SearchComponent },
  { path: "**", redirectTo: "" }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}

import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { HomeComponent } from "./home/home.component";
import { SearchComponent } from "./search/search.component";
import { NotesComponent } from "./notes/notes.component";
import { SavedComponent } from "./saved/saved.component";
import { SignUpInComponent } from "./sign-up-in/sign-up-in.component";

const routes: Routes = [
  { path: "", component: SearchComponent },
  { path: "search", redirectTo: "" },
  { path: "notes", component: NotesComponent },
  { path: "saved", component: SavedComponent },
  { path: "sign", component: SignUpInComponent },
  { path: "**", redirectTo: "" }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}

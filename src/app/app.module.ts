import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { AppRoutingModule } from "./app-routing.module";
import { HttpClientModule } from "@angular/common/http";
import { AppComponent } from "./app.component";
import { HomeComponent } from "./home/home.component";
import { SearchComponent } from "./search/search.component";
import { NotesComponent } from "./notes/notes.component";
import { SavedComponent } from "./saved/saved.component";
import { SignUpInComponent } from "./sign-up-in/sign-up-in.component";
import { AboutComponent } from './about/about.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    SearchComponent,
    NotesComponent,
    SavedComponent,
    SignUpInComponent,
    AboutComponent
  ],
  imports: [BrowserModule, AppRoutingModule, FormsModule, HttpClientModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}

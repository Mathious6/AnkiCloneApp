import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ExploreLessonComponent } from "./explore-lesson/explore-lesson.component"
import {AppComponent} from "./app.component";
import {FooterComponent} from "./components/footer/footer.component";
import {HomeCarousselComponent} from "./components/home-caroussel/home-caroussel.component";
import {NavbarComponent} from "./components/navbar/navbar.component";
import {StudyNowComponent} from "./study-now/study-now.component";
import {SharedDecksComponent} from "./shared-decks/shared-decks.component";
import {ProgressStatisticsComponent} from "./progress-statistics/progress-statistics.component";
import {AchievementsComponent} from "./achievements/achievements.component";
import {NewComponent} from "./new/new.component";
import {GlossaryComponent} from "./glossary/glossary.component";
import {DocumentationComponent} from "./documentation/documentation.component";
import {AboutComponent} from "./about/about.component";

const routes: Routes = [
  {path : 'explore-lesson', component:ExploreLessonComponent},
  {path : 'app', component:AppComponent},
  {path : 'footer', component: FooterComponent},
  {path : 'home', component:HomeCarousselComponent},
  {path : 'header', component : NavbarComponent},
  {path : 'study-now', component : StudyNowComponent},
  {path : 'shared-decks', component : SharedDecksComponent},
  {path : 'progess-statistics', component : ProgressStatisticsComponent},
  {path : 'achievements', component : AchievementsComponent},
  {path : '', redirectTo : '/home', pathMatch: 'full'},
  {path : 'new', component : NewComponent},
  {path : 'glossary', component : GlossaryComponent},
  {path : 'documentation', component : DocumentationComponent},
  {path : 'about', component : AboutComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

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
import {NewCardComponent} from "./new-card/new-card.component";
import {NewPackageComponent} from "./new-package/new-package.component";


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
  {path : 'new-card', component : NewCardComponent},
  {path : 'new-package', component : NewPackageComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

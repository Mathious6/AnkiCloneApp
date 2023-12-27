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
import {GlossaryComponent} from "./glossary/glossary.component";
import {DocumentationComponent} from "./documentation/documentation.component";
import {AboutComponent} from "./about/about.component";
import {SettingsComponent} from "./settings/settings.component";
import {authGuard} from "./auth.guard";
import {LoginComponent} from "./login/login.component";
import {SoonComponent} from "./soon/soon.component";
import {ChangePasswordComponent} from "./change-password/change-password.component";

const routes: Routes = [
  {path : '', redirectTo : '/login', pathMatch: 'full'},
  {path : 'login', component : LoginComponent},
  {path : 'explore-lesson', component:ExploreLessonComponent, canActivate: [authGuard]},
  {path : 'app', component:AppComponent, canActivate: [authGuard]},
  {path : 'footer', component: FooterComponent, canActivate: [authGuard]},
  {path : 'home', component:HomeCarousselComponent, canActivate: [authGuard]},
  {path : 'header', component : NavbarComponent, canActivate: [authGuard]},
  {path : 'study-now', component : StudyNowComponent, canActivate: [authGuard]},
  {path : 'shared-decks', component : SharedDecksComponent, canActivate: [authGuard]},
  {path : 'progress-statistics', component : ProgressStatisticsComponent, canActivate: [authGuard]},
  {path : 'achievements', component : AchievementsComponent, canActivate: [authGuard]},
  {path : 'glossary', component : GlossaryComponent, canActivate: [authGuard]},
  {path : 'documentation', component : DocumentationComponent, canActivate: [authGuard]},
  {path : 'about', component : AboutComponent, canActivate: [authGuard]},
  {path : 'settings', component : SettingsComponent, canActivate: [authGuard]},
  {path : 'soon', component : SoonComponent, canActivate: [authGuard]},
  {path : 'change-password', component : ChangePasswordComponent, canActivate: [authGuard]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

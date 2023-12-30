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
import {GlossaryComponent} from "./glossary/glossary.component";
import {DocumentationComponent} from "./documentation/documentation.component";
import {AboutComponent} from "./about/about.component";
import {SettingsComponent} from "./settings/settings.component";
import {authGuard} from "./auth.guard";
import {LoginComponent} from "./login/login.component";
import {SoonComponent} from "./soon/soon.component";
import {ChangePasswordComponent} from "./change-password/change-password.component";
import {NewCardComponent} from "./new-card/new-card.component";
import {NewPackageComponent} from "./new-package/new-package.component";
import {LessonViewComponent} from "./lesson-view/lesson-view.component";
import {SignUpComponent} from "./sign-up/sign-up.component";
import {PricingComponent} from "./pricing/pricing.component";

const routes: Routes = [
  {path : '', redirectTo : '/home', pathMatch: 'full'},
  {path : 'login', component : LoginComponent},
  {path : 'home', component:HomeCarousselComponent},
  {path : 'about', component : AboutComponent},
  {path : 'soon', component : SoonComponent},
  {path : 'sign-up', component : SignUpComponent},
  {path : 'pricing', component : PricingComponent},
  {path : 'explore-lesson', component:ExploreLessonComponent, canActivate: [authGuard]},
  {path : 'app', component:AppComponent, canActivate: [authGuard]},
  {path : 'footer', component: FooterComponent, canActivate: [authGuard]},
  {path : 'header', component : NavbarComponent, canActivate: [authGuard]},
  {path : 'study-now', component : StudyNowComponent, canActivate: [authGuard]},
  {path : 'shared-decks', component : SharedDecksComponent, canActivate: [authGuard]},
  {path : 'progress-statistics', component : ProgressStatisticsComponent, canActivate: [authGuard]},
  {path : 'glossary', component : GlossaryComponent, canActivate: [authGuard]},
  {path : 'documentation', component : DocumentationComponent, canActivate: [authGuard]},
  {path : 'settings', component : SettingsComponent, canActivate: [authGuard]},
  {path : 'change-password', component : ChangePasswordComponent, canActivate: [authGuard]},
  {path : 'new-card', component : NewCardComponent, canActivate: [authGuard]},
  {path : 'new-package', component : NewPackageComponent, canActivate: [authGuard]},
  {path : 'lesson-view', component : LessonViewComponent, canActivate: [authGuard]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {NavbarComponent} from './components/navbar/navbar.component';
import {NgOptimizedImage} from "@angular/common";
import {FooterComponent} from './components/footer/footer.component';
import {HomeCarousselComponent} from './components/home-caroussel/home-caroussel.component';
import { ExploreLessonComponent } from './explore-lesson/explore-lesson.component';
import { StudyNowComponent } from './study-now/study-now.component';
import { SharedDecksComponent } from './shared-decks/shared-decks.component';
import { ProgressStatisticsComponent } from './progress-statistics/progress-statistics.component';
import { AchievementsComponent } from './achievements/achievements.component';
import {HttpClientModule} from "@angular/common/http";
import { NewCardComponent } from './new-card/new-card.component';
import { NewPackageComponent } from './new-package/new-package.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FooterComponent,
    HomeCarousselComponent,
    ExploreLessonComponent,
    StudyNowComponent,
    SharedDecksComponent,
    ProgressStatisticsComponent,
    AchievementsComponent,
    NewCardComponent,
    NewPackageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    NgOptimizedImage,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}

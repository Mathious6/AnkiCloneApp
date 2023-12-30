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
import {HttpClientModule} from "@angular/common/http";
import { NewCardComponent } from './new-card/new-card.component';
import { NewPackageComponent } from './new-package/new-package.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { GlossaryComponent } from './glossary/glossary.component';
import { DocumentationComponent } from './documentation/documentation.component';
import { AboutComponent } from './about/about.component';
import { SettingsComponent } from './settings/settings.component';
import { SettingsDeactivateModalComponent } from './settings-deactivate-modal/settings-deactivate-modal.component';
import { ErrorModalComponent } from './error-modal/error-modal.component';
import { SoonComponent } from './soon/soon.component';
import { RouterModule} from "@angular/router";
import { LoginComponent } from './login/login.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { LessonViewComponent } from './lesson-view/lesson-view.component';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {HighchartsChartModule} from "highcharts-angular";
import { SignUpComponent } from './sign-up/sign-up.component';
import { PricingComponent } from './pricing/pricing.component';
import { NotfoundComponent } from './notfound/notfound.component';
import { LessonModalComponent } from './lesson-modal/lesson-modal.component';
import { NewLessonModalComponent } from './new-lesson-modal/new-lesson-modal.component';

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
    NewCardComponent,
    NewPackageComponent,
    GlossaryComponent,
    DocumentationComponent,
    AboutComponent,
    SettingsComponent,
    SettingsDeactivateModalComponent,
    ErrorModalComponent,
    SoonComponent,
    LoginComponent,
    SettingsComponent,
    AboutComponent,
    ChangePasswordComponent,
    LessonViewComponent,
    SignUpComponent,
    PricingComponent,
    NotfoundComponent,
    LessonModalComponent,
    NewLessonModalComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    NgOptimizedImage,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    HighchartsChartModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}

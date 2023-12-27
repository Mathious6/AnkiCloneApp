import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {LearningPackage} from "./model/LearningPackage";
import {ExploreLessonComponent} from "./explore-lesson/explore-lesson.component";

/*export interface Package {
  packageId: number;
  title: string;
  description: string;
  category: string;
  targetAudience: string;
  duration: number;
  creationDate: Date;
  creatorId: number;
}*/

export interface tag {
  tagId: number;
  englishKeyword: string;
  frenchTranslation: string;
}

export interface user {
  userId: number;
  mail: string;
  pseudo: string;
  password: string;
  registrationDate: Date;
  profilePicture: string;
  isActive: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class HttpFacadeService {

  constructor(private httpClient: HttpClient) {

  }

  getTags(): Observable<tag[]> {
    return this.httpClient.get<tag[]>('api/tag')
  }
  getSpecificUser(userId: number): Observable<user> {
    return this.httpClient.get<user>(`api/user/${userId}`)
  }

  getPackage(): Observable<LearningPackage[]> {
    return this.httpClient.get<LearningPackage[]>('api/package')
  }

  getSearchPackage(title: string, description : string, category : string): Observable<LearningPackage[]> {
    return this.httpClient.get<LearningPackage[]>('api/package/search')
  }




}

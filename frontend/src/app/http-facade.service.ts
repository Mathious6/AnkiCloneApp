import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable, switchMap} from "rxjs";
import {AuthService} from "./auth.service";
export interface LearningFact {
  factId: number;
  front: string;
  back: string;
  source: string;
  relatedImage: string;
  relatedLink: string;
  isActive: boolean;
  packageId: number;
  creatorId: number;
}
export interface Package {
  packageId: number;
  title: string;
  description: string;
  category: string;
  targetAudience: string;
  duration: number;
  creationDate: Date;
  creatorId: number;
}
export interface LearningPackage {
  packageId: number;
  title: string;
  description: string;
  category: string;
  targetAudience: string;
  duration: number;
  creationDate: Date;
  creatorId: number;
}

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
    return this.httpClient.get<tag[]>('api/tag');
  }
  getSpecificUser(userId: number): Observable<user> {
    return this.httpClient.get<user>(`api/user/${userId}`);
  }
  deactivateUser(userId: number): Observable<void>{
    return this.httpClient.put<void>(`api/user/${userId}/deactivate`, {});
  }

  getAllUsers(): Observable<user[]> {
    return this.httpClient.get<user[]>(`api/user`);
  }

  getUser(userId: number): Observable<user> {
    return this.httpClient.get<user>(`api/user/${userId}`);
  }
  changePassword(user:user, password: string): Observable<user> {
    return this.httpClient.put<void>(`api/user/${user.userId}`, {
      userId: user.userId,
      mail: user.mail,
      pseudo: user.pseudo,
      password: password,
      registrationDate: user.registrationDate,
      profilePicture: user.profilePicture,
      isActive: user.isActive,
    }).pipe(
        switchMap(() => this.getUser(user.userId))
    );
  }

  getAllLearningPackage(): Observable<LearningPackage[]> {
    return this.httpClient.get<LearningPackage[]>('api/package')
  }

  getSearchPackage(title: string, description : string, category : string): Observable<LearningPackage[]> {
    return this.httpClient.get<LearningPackage[]>('api/package/search')
  }

  getAllLearningFact(): Observable<LearningFact[]> {
    return this.httpClient.get<LearningFact[]>('api/fact')
  }
}

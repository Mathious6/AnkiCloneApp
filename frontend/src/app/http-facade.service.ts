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
export interface Tag {
  tagId: number;
  englishKeyword: string;
  frenchTranslation: string;
}
export interface User {
  userId: number;
  mail: string;
  pseudo: string;
  password: string;
  registrationDate: Date;
  profilePicture: string;
  isActive: boolean;
}
export interface UserLearningPackage {
  userLearningPackageId: number;
  startDate: Date;
  expectedEndDate: Date;
  minutesPerDayObjective: number;
  progress: number;
  userId: number;
  learningPackageId: number;
}
export interface UserLearningFact {
  userLearningFactId: number;
  reviewCount: number;
  confidenceLevel: string;
  lastReviewed: Date;
  nextReviewDate: Date;
  factId: number;
  userId: number;
}

@Injectable({
  providedIn: 'root'
})
export class HttpFacadeService {

  constructor(private httpClient: HttpClient) {
  }
  //User
  getUser(userId: number): Observable<User> {
    return this.httpClient.get<User>(`api/user/${userId}`);
  }
  getAllUsers(): Observable<User[]> {
    return this.httpClient.get<User[]>(`api/user`);
  }
  createUser(username: string, mail: string, password: string): Observable<User> {
    return this.httpClient.post<User>(`api/user`,{
      mail: mail,
      pseudo: username,
      password: password,
      profilePicture: 'https://www.shutterstock.com/image-vector/vector-flat-illustration-grayscale-avatar-600nw-2281862025.jpg',
    });
  }
  deactivateUser(userId: number): Observable<void>{
    return this.httpClient.put<void>(`api/user/${userId}/deactivate`, {});
  }
  //Login
  changePassword(user:User, password: string): Observable<User> {
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
  //Learning Package
  getAllLearningPackage(): Observable<LearningPackage[]> {
    return this.httpClient.get<LearningPackage[]>('api/package')
  }
  getSearchPackage(query: string): Observable<LearningPackage[]> {
    return this.httpClient.get<LearningPackage[]>(`api/package/search/${query}`)
  }
  getPackageCreatorId(creatorId : number) : Observable<LearningPackage[]> {
    return this.httpClient.get<LearningPackage[]>(`api/package/creator/${creatorId}`)
  }
  postNewLearningPackage(title : string, description : string,category : string,targetAudience : string,duration : number, creatorId : number):Observable<LearningPackage>{
    const body = {title, description,category,targetAudience,duration,creatorId};
    return  this.httpClient.post<LearningPackage>(`api/package`, body);
  }
  deleteLearningPackage(packageId : string): Observable<any>{
    return this.httpClient.delete<any>(`api/package/${packageId}`);
  }
  //User Learning Package
  getUserLearningPackage(userId: string, factId: number): Observable<UserLearningFact> {
    return this.httpClient.get<UserLearningFact>(`api/fact/${factId}/user/${userId}`)
  }
  getAllUserLearningPackage(userId: string): Observable<any> {
    return this.httpClient.get<any>(`api/package/user/${userId}`)
  }
  getOverviewUserLearningPackage(userId: string, packageId: string): Observable<any> {
    return this.httpClient.get<any>(`api/package/${packageId}/user/${userId}/overview`)
  }
  resetUserLearningPackage(userId: number, packageId: number): Observable<any> {
    return this.httpClient.put<any>(`api/package/${packageId}/reset/${userId}`, {});
  }
  deleteUserLearningPackage(userId: number, packageId: number): Observable<any> {
    return this.httpClient.delete<any>(`api/package/${packageId}/stop/${userId}`);
  }
  startUserLearningPackage(userId: number, packageId: number): Observable<any> {
    return this.httpClient.post<any>(`api/package/${packageId}/start/${userId}`, {});
  }
  //Learning Fact
  getAllLearningFact(): Observable<LearningFact[]> {
    return this.httpClient.get<LearningFact[]>('api/fact')
  }
  getAllLearningFactByPackageId(packageId: number): Observable<LearningFact[]> {
    return this.httpClient.get<LearningFact[]>(`api/package/${packageId}/fact`);
  }
  postNewLearningFact(front: string, back: string, source: string, image: string, url: string, packageId: number, userId: number): Observable<LearningFact> {
    const body = { front : front, back : back, source : source, relatedImage: image, relatedLink: url, creatorId: userId };
    return this.httpClient.post<LearningFact>(`api/package/${packageId}/fact`, body);
  }
  deleteLearningFact(factId : string): Observable<any>{
    return this.httpClient.delete<any>(`api/fact/${factId}`)
  }
  //User Learning Fact
  reviewUserLearningFact(userId: string, factId: number, confidenceLevel: number): Observable<UserLearningFact> {
    return this.httpClient.put<UserLearningFact>(`api/fact/${factId}/review/${userId}`, {confidenceLevel: confidenceLevel})
  }
  //Statistics
  getUserStatistics(userId: string): Observable<any> {
    return this.httpClient.get<any>(`api/statistics/user/${userId}`);
  }

  //Tags
  getTags():Observable<Tag[]>{
    return  this.httpClient.get<Tag[]>(`api/tag`);
  }
  postPackageTag(packageId : number,tagId : number):Observable<Tag>{
    return this.httpClient.post<Tag>(`api/package/${packageId}/tag`, {tagId})
  }
  postTag(englishKeyword : string): Observable<Tag>{
    return this.httpClient.post<Tag>(`api/tag`, {englishKeyword});
  }
  getPackageTag(packageId : number): Observable<Tag[]>{
    return this.httpClient.get<Tag[]>(`api/package/${packageId}/tag`);
  }
  deleteTagById(tagId : string): Observable<any>{
    return this.httpClient.delete<any>(`api/tag/${tagId}`)
  }
}

import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {LearningPackage} from "./model/LearningPackage";

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

@Injectable({
  providedIn: 'root'
})
export class HttpFacadeService {

  constructor(private httpClient: HttpClient) {

  }

  testGet(): Observable<LearningPackage> {
    return this.httpClient.get<LearningPackage>('api/package')
  }

  getPackage(): Observable<LearningPackage[]> {
    return this.httpClient.get<LearningPackage[]>('api/package')
  }


}

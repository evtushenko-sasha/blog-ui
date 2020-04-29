import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {Tag} from '../model/Tag';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TagService {

  constructor(private httpClient: HttpClient) {
  }

  /*TODO:refactor this*/
  getTags(): Observable<Tag[]> {
    return this.httpClient.get<Tag[]>(`${environment.tagsAPI}`);
  }
}

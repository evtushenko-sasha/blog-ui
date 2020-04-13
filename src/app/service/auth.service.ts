import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {LoginCredentials} from '../model/LoginCredentials';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private httpClient: HttpClient) {
  }

  login(credentials: LoginCredentials): Promise<any> {
    return new Promise((resolve, reject) => {
      const headers = new Headers();
      headers.append('Content-Type', 'application/json');

      // this.httpClient.post(`${environment.loginAPI}/login`, JSON.stringify(credentials), {headers})
      //   .subscribe(res => {
      //     resolve(res.json());
      //   }, (err) => {
      //     reject(err);
      //   });
    });
  }

  signUp(data) {
    return new Promise((resolve, reject) => {
      const headers = new Headers();
      headers.append('Content-Type', 'application/json');

      // this.httpClient.post(`${environment.loginAPI}/signUp`, JSON.stringify(data), {headers})
      //   .subscribe(res => {
      //     resolve(res.json());
      //   }, (err) => {
      //     reject(err);
      //   });
    });
  }

  logout() {
    return new Promise((resolve, reject) => {
      const headers = new Headers();
      headers.append('X-Auth-Token', localStorage.getItem('token'));

      // this.httpClient.post(`${environment.loginAPI}/logout`, {}, {headers})
      //   .subscribe(res => {
      //     localStorage.clear();
      //   }, (err) => {
      //     reject(err);
      //   });
    });
  }
}

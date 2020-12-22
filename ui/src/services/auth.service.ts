import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../core/enviroment';
import {ResponseOrMessage} from '../models/response/response.or.message.model';
import {SignInResponse} from '../models/actor/sign.in.response.model';

@Injectable()
export class AuthService {
  protected readonly http: HttpClient;

  constructor(http: HttpClient) {
    this.http = http;
  }

  signIn(login: string, password: string) {
    const url = environment.signIn;
    return this.http.post<ResponseOrMessage<SignInResponse>>(url, {login, password });
  }

  signUp( password: string, name: string, login: string, personType: string) {
    const url = environment.signUp;
    return this.http.post<ResponseOrMessage<boolean>>(url, { password, name, login, personType});
  }

  signOut(id: number, personType: string) {
    const url = environment.signOut;
    return this.http.post(url, {id, personType});
  }
}

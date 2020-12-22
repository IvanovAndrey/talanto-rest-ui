import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../core/enviroment';
import {ResponseOrMessage} from '../models/response/response.or.message.model';
import {ApiResult} from '../models/response/api.result.model';
import {User} from '../models/actor/user.model';
import {Complaint} from '../models/complaint.model';
import {SignInResponse} from '../models/actor/sign.in.response.model';
import {RequestModel} from '../models/request.model';
import {NotificationModel} from "../models/notification.model";
import {Lesson} from "../models/lesson.model";

@Injectable()
export class UserService {
  constructor(http: HttpClient) {
    this.http = http;
  }
  protected readonly http: HttpClient;

  getById(personId: number) {
    const url = environment.getUserById;
    console.log(personId);
    return this.http.post<ResponseOrMessage<User>>(url, {personId});
  }

  setComplaint(id: number, idLesson: number, theme: string, text: string) {
    const url = environment.setComplaint;
    // Дебаг //
    console.log(id + '/n' + idLesson + '/n' + theme + '/n' + text + '/n');
    return this.http.post<ResponseOrMessage<Complaint>>(url, {id, id_incedent: idLesson, theme, text});
  }

  setRequest(id: number, daysArr: string) {
    const url = environment.setRequest;
    return this.http.post<ResponseOrMessage<RequestModel>>(url, {id, daysArr});
  }

  getNotifications(id: number) {
    const url = environment.getNotifications + '/' + id;
    return this.http.get<NotificationModel[]>(url, {});
  }

  getNotification(id: number) {
    const url = environment.getSingleNotification + '/' + id;
    return this.http.get<NotificationModel>(url, {});
  }

  getLessons() {
    const url = environment.getLessons;
    return this.http.get<Lesson[]>(url);
  }
}

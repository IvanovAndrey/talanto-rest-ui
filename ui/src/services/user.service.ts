import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../core/enviroment';
import {ResponseOrMessage} from '../models/response/response.or.message.model';
import {User} from '../models/actor/user.model';
import {Complaint} from '../models/complaint.model';
import {RequestModel} from '../models/request.model';
import {NotificationModel} from '../models/notification.model';
import {Lesson} from '../models/lesson.model';
import {LessonFull} from '../models/response/lesson.full.model';

@Injectable()
export class UserService {
  constructor(http: HttpClient) {
    this.http = http;
  }
  protected readonly http: HttpClient;

  getById(personId: number) {
    const url = environment.getUserById;
    return this.http.post<ResponseOrMessage<User>>(url, {personId});
  }

  setComplaint(id: number, idLesson: number, theme: string, text: string) {
    const url = environment.setComplaint;
    return this.http.post<ResponseOrMessage<Complaint>>(url, {id, id_incedent: idLesson, theme, text});
  }

  setNotification(idFrom: number, idTo: number, status: string, theme: string, text: string) {
    const url = environment.setNotification;
    return this.http.post<ResponseOrMessage<Notification>>(url, {id_from: idFrom, id_to: idTo, status, theme, text});
  }

  setLesson(idTeacher: number,
            theme: string,
            commentary: string,
            status: string,
            dateOfLesson: Date,
            students: string[]) {
    const url = environment.setLesson;
    return this.http.post<ResponseOrMessage<LessonFull>>(url, {id_teacher: idTeacher,
                                                                  status,
                                                                  theme,
                                                                  commentary,
                                                                  date_of_lesson: dateOfLesson,
                                                                  students});
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

  getUsers() {
    const url = environment.getUsers;
    return this.http.get<User[]>(url);
  }
}

import {Component, Input, OnInit} from '@angular/core';
import {NotificationModel} from '../../../../models/notification.model';
import {User} from '../../../../models/actor/user.model';
import {StoreService} from '../../../../services/store.service';
import {UserService} from '../../../../services/user.service';
import {MatDialog} from '@angular/material/dialog';
import {DialogComponent} from '../../../components/dialog/dialog.component';

@Component({
  selector: 'app-create-notification',
  templateUrl: './create-notification.component.html',
  styleUrls: ['./create-notification.component.css']
})
export class CreateNotificationComponent implements OnInit {
  public notification: NotificationModel ;
  @Input() user: User;
  private id: number;
  text: any;
  theme: any;
  idTo: any;
  constructor(private storeService: StoreService,
              private userService: UserService,
              public dialog: MatDialog) {
    this.id = this.storeService.getId();
    this.userService.getById(this.id).subscribe(
      data => {
        if (data.body) {
          this.user = data.body;
        } else {
          alert(data.message);
        }
      }, error => alert(error)
    );
  }
  ngOnInit(): void {
    if (!this.notification) {
      this.notification = {id: undefined, idTo: 0, idFrom: this.id, status: 'NEW', theme: '', text: ''};
    } else {
      // tslint:disable-next-line:no-unused-expression
      !this.notification.idTo && (this.notification.idTo = 0);
      // tslint:disable-next-line:no-unused-expression
      !this.notification.theme && (this.notification.theme = '');
      // tslint:disable-next-line:no-unused-expression
      !this.notification.text && (this.notification.text = '');
    }
  }
  setNotification() {
    this.userService.setNotification(
      this.notification.idFrom,
      this.notification.idTo,
      this.notification.status,
      this.notification.theme,
      this.notification.text).subscribe(
      data => {
        alert(data.message);
      }, error => alert(error)
    );
  }
}

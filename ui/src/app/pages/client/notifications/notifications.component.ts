import {Component, Input, OnInit} from '@angular/core';
import {Complaint} from '../../../../models/complaint.model';
import {UserService} from '../../../../services/user.service';
import {StoreService} from '../../../../services/store.service';
import {User} from '../../../../models/actor/user.model';
import {NotificationModel} from '../../../../models/notification.model';
import {DialogComponent} from '../../../components/dialog/dialog.component';
import {MatDialog} from '@angular/material/dialog';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.css']
})
export class NotificationsComponent implements OnInit {
  public createNotifications: NotificationModel[];
  public createNotification: NotificationModel ;
  @Input() client: User;
  private id: number;
  text: any;
  theme: any;
  constructor(private storeService: StoreService,
              private userService: UserService,
              public dialog: MatDialog) {
    this.id = this.storeService.getId();
    this.userService.getById(this.id).subscribe(
      data => {
        if (data.body) {
          this.client = data.body;
        } else {
          alert(data.message);
        }
      }, error => alert(error)
    );
    this.getAllNotifications();
  }
  ngOnInit(): void {
  }
  openDialog(id: number): void {
    this.getNotification(id);
    console.log('notif id is' + id);
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '250px',
      data: {theme: this.createNotification.theme, text: this.createNotification.text}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.createNotification.status = result;
    });
  }
  getAllNotifications() {
    this.userService.getNotifications(this.id).subscribe(data => { if (data) {
      this.createNotifications = data;
      console.log(data);
    } else {
        console.log('Something wrong');
    } }, error => alert('Error is occured')
    );
  }

  getNotification(id: number) {
    this.userService.getNotification(id).subscribe(data => { if (data) {
        this.createNotification = data;
        console.log('Single notification is' + data);
      } else {
        console.log('Something wrong');
      } }, error => alert('Error is occured')
    );
  }
}

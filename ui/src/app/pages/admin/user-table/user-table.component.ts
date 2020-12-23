import {Component, Input, OnInit} from '@angular/core';
import {NotificationModel} from '../../../../models/notification.model';
import {User} from '../../../../models/actor/user.model';
import {StoreService} from '../../../../services/store.service';
import {UserService} from '../../../../services/user.service';
import {MatDialog} from '@angular/material/dialog';


@Component({
  selector: 'app-user-table',
  templateUrl: './user-table.component.html',
  styleUrls: ['./user-table.component.css']
})
export class UserTableComponent implements OnInit {

  public createUsers: User[];
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
  getAllNotifications() {
    this.userService.getUsers().subscribe(data => { if (data) {
        this.createUsers = data;
        console.log(data);
      } else {
        console.log('Something wrong');
      } }, error => alert('Error is occured')
    );
  }
}

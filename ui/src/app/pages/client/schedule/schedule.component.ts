import {Component, Input, OnInit} from '@angular/core';
import {NotificationModel} from '../../../../models/notification.model';
import {User} from '../../../../models/actor/user.model';
import {StoreService} from '../../../../services/store.service';
import {UserService} from '../../../../services/user.service';
import {Lesson} from '../../../../models/lesson.model';
import {MatDialog} from '@angular/material/dialog';
import {DialogComponent} from "../../../components/dialog/dialog.component";
import {LessonComponent} from "../../../components/lesson/lesson.component";

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.css']
})
export class ScheduleComponent implements OnInit {
  public createLessons: Lesson[];
  @Input() client: User;
  id: number;
  animal: string;
  name: string;
  date: any;
  teacher: any;
  theme: any;
  status: any;
  commentary: any;
  idLesson: any;
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
    this.getLessons();
  }

  ngOnInit(): void {
  }
  openDialog(id: number): void {
    // this.getNotification(id);
    console.log('notif id is' + id);
    const dialogRef = this.dialog.open(LessonComponent, {
      width: '1000px',
      // data: {theme: this.createNotification.theme, text: this.createNotification.text}
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      // this.createNotification.status = result;
    });
  }
  getLessons() {
    this.userService.getLessons().subscribe(data => { if (data) {
        this.createLessons = data;
        console.log(data);
      } else {
        console.log('Something wrong');
      } }, error => alert('Error is occured')
    );
  }
}

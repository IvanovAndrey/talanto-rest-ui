import {Component, Input, NgModule, OnInit} from '@angular/core';
import {NotificationModel} from '../../../../models/notification.model';
import {User} from '../../../../models/actor/user.model';
import {StoreService} from '../../../../services/store.service';
import {UserService} from '../../../../services/user.service';
import {MatDialog} from '@angular/material/dialog';
import {Lesson} from '../../../../models/lesson.model';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {MatChipInputEvent} from '@angular/material/chips';

export interface Student {
  name: string;
}
@Component({
  selector: 'app-create-lesson',
  templateUrl: './create-lesson.component.html',
  styleUrls: ['./create-lesson.component.css']
})

export class CreateLessonComponent implements OnInit {

  public lesson: Lesson ;
  @Input() user: User;
  private id: number;
  theme: any;
  idTeacher: any;
  dateOfLesson: any;
  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];
  students: Student[] = [
  ];
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
    if (!this.lesson) {
      this.lesson = {id: undefined, idTeacher: 0,  status: 'OPEN', theme: '', commentary: '', dateOfLesson: undefined};
    } else {
      // tslint:disable-next-line:no-unused-expression
      !this.lesson.idTeacher && (this.lesson.idTeacher = 0);
      // tslint:disable-next-line:no-unused-expression
      !this.lesson.theme && (this.lesson.theme = '');
      // tslint:disable-next-line:no-unused-expression
      !this.lesson.dateOfLesson && (this.lesson.dateOfLesson = undefined);
    }
  }
  add(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    // Add our fruit
    if ((value || '').trim()) {
      this.students.push({name: value.trim()});
    }

    // Reset the input value
    if (input) {
      input.value = '';
    }
    console.log(this.students);
  }

  remove(student: Student): void {
    const index = this.students.indexOf(student);

    if (index >= 0) {
      this.students.splice(index, 1);
    }
  }
  setLesson() {
    const studentsList: string[] = [];
    for (const student of this.students) {
      studentsList.push(student.name);
    }
    this.userService.setLesson(
      this.lesson.idTeacher,
      this.lesson.theme,
      this.lesson.commentary,
      this.lesson.status,
      this.lesson.dateOfLesson,
      studentsList).subscribe(
      data => {
        alert(data.message);
      }, error => alert(error)
    );
  }
}

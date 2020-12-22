import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {ScheduleComponent} from '../../pages/user/schedule/schedule.component';

@Component({
  selector: 'app-lesson',
  templateUrl: './lesson.component.html',
  styleUrls: ['./lesson.component.css']
})
export class LessonComponent implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<LessonComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ScheduleComponent) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
  ngOnInit(): void {
  }

}

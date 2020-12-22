import {Component, Input, OnInit} from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {User} from '../../../../models/actor/user.model';
import {UserService} from '../../../../services/user.service';
import {StoreService} from '../../../../services/store.service';

@Component({
  selector: 'app-request',
  templateUrl: './request.component.html',
  styleUrls: ['./request.component.css']
})
export class RequestComponent implements OnInit {
  @Input() client: User;
  private id: number;

  form: FormGroup;
  dayList: any = [
    { id: 1, name: 'Понедельник' },
    { id: 2, name: 'Вторник' },
    { id: 3, name: 'Среда' },
    { id: 4, name: 'Четверг' },
    { id: 5, name: 'Пятница' },
    { id: 6, name: 'Суббота' },
    { id: 7, name: 'Воскресенье' }
  ];

  constructor(private formBuilder: FormBuilder,
              private userService: UserService,
              private storeService: StoreService) {
    this.form = this.formBuilder.group({
      day: this.formBuilder.array([], [Validators.required])
    });
    this.userService = userService;
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
  }
  onCheckboxChange(e) {
    const day: FormArray = this.form.get('day') as FormArray;

    if (e.target.checked) {
      day.push(new FormControl(e.target.value));
    } else {
      const index = day.controls.findIndex(x => x.value === e.target.value);
      day.removeAt(index);
    }
  }

  submit() {
    let daysString = '';
    let i: any;
    const mass: any = this.form.value.day;
    console.log('mass is ' + mass);
    // tslint:disable-next-line:forin
    for (i in mass) {
      if (i > 0) {
        daysString += ' % ';
      }
      daysString += mass[i];
    }
    this.setRequest(daysString);
  }
  ngOnInit(): void {
  }

  setRequest(value: string) {
    this.userService.setRequest(this.client.id, value).subscribe(
      data => {
        alert(data.message);
      }, error => alert(error)
    );
  }
}

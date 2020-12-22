import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {StoreService} from '../../../../services/store.service';
import {UserService} from '../../../../services/user.service';
import {User} from '../../../../models/actor/user.model';
import {Complaint} from '../../../../models/complaint.model';

@Component({
  selector: 'app-complaint',
  templateUrl: './complaint.component.html',
  styleUrls: ['./complaint.component.css']
})
export class ComplaintComponent implements OnInit {
  private id: number;
  @Input() client: User;
  complaint: Complaint;
  complaintFormGroup: FormGroup;

  constructor(private _formBuilder: FormBuilder,
              private userService: UserService,
              private storeService: StoreService) {
    this.storeService = storeService;
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

  ngOnInit(): void {
    if (!this.complaint) {
      this.complaint = {id: undefined, idLesson: 0, theme: '', text: ''};
    } else {
      // tslint:disable-next-line:no-unused-expression
      !this.complaint.idLesson && (this.complaint.idLesson = 0);
      // tslint:disable-next-line:no-unused-expression
      !this.complaint.theme && (this.complaint.theme = '');
      // tslint:disable-next-line:no-unused-expression
      !this.complaint.text && (this.complaint.text = '');
    }
  }

  setComplaint() {
    this.userService.setComplaint(this.client.id,
      this.complaint.idLesson,
      this.complaint.theme,
      this.complaint.text).subscribe(
      data => {
          alert(data.message);
      }, error => alert(error)
    );
  }
}

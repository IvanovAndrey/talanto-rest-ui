import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {AuthService} from '../../../../services/auth.service';
import {FormControl, FormGroup, FormGroupDirective, NgForm, Validators, FormBuilder} from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material/core';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

export class MyErrorStateMatcherForPassword implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const invalidCtrl = !!(control && control.invalid && control.parent.dirty);
    const invalidParent = !!(control && control.parent && control.parent.invalid && control.parent.dirty);
    return (invalidCtrl || invalidParent);
  }
}

interface Statuses {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {
  public name: string;
  public login: string;
  hide = true;
  hide2 = true;
  myForm: FormGroup;
  status: string;
  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);

  statuses: Statuses[] = [
    {value: 'client', viewValue: 'Клиент'},
    {value: 'teacher', viewValue: 'Учитель'},
    {value: 'admin', viewValue: 'Администратор'}
  ];

  matcher = new MyErrorStateMatcher();
  matcherForPassword = new MyErrorStateMatcherForPassword();

  errorMessage: string;

  constructor(private router: Router, private authService: AuthService, private formBuilder: FormBuilder) {
  }

  ngOnInit(): void {
    this.myForm = this.formBuilder.group({
      password: ['', Validators.compose([Validators.required, Validators.minLength(7)])],
      confirmPassword: ['']
    }, {validator: this.checkPasswords});
  }

  checkPasswords(group: FormGroup) {
    const pass = group.controls.password.value;
    const confirmPass = group.controls.confirmPassword.value;
    return pass === confirmPass ? null : {notSame: true};
  }

  signUp() {
    const pass = this.myForm.get('password').value;
    console.log(this.status);
    this.authService.signUp(pass,
      this.name, this.login, this.status).subscribe(
      data => {
        if (data.body) {
          this.router.navigateByUrl('/sign-in');
        } else {
          alert(data.message);
        }
      }, error => alert(error)
    );
  }

  signIn() {
    return this.router.navigateByUrl('/sign-in');
  }
}

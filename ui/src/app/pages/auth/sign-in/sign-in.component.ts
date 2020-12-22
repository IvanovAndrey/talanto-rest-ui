import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {AuthService} from '../../../../services/auth.service';
import {StoreService} from '../../../../services/store.service';


@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {
  public login: string;
  public password: string;
  public flag: boolean;
  hide = true;

  constructor(private router: Router, private authService: AuthService, private storeService: StoreService) {
  }


  ngOnInit(): void {
  }

  signIn() {
    this.flag = this.login || this.password ? this.flag : true;
    this.authService.
    signIn(this.login, this.password).subscribe(
      data => {
        if (data.message !== null) {
          this.flag = true;
        } else {
           // if ( /*JSON.stringify(this.password) === JSON.stringify(data.body.password*/)) {
              this.storeService.setPersonType(data.body.personType);
              this.storeService.setId(data.body.personId);
              return this.router.navigateByUrl('/clientStart');
            /*} else {
              this.flag = true;
            }*/
          }
      }, error => alert(error));
  }

  createAccount() {
    return this.router.navigateByUrl('/sign-up');
  }
}

@Component({
  selector: 'app-dialog-content',
  templateUrl: 'dialog-content.html',
})
export class DialogContentComponent {}
